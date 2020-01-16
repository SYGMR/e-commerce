<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiSubresource;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CartRepository")
 * @ApiResource
 */
class Cart
{
	/**
	 * @ORM\Id()
	 * @ORM\GeneratedValue()
	 * @ORM\Column(type="integer")
	 */
	private $id;

	/**
	 * @ORM\OneToOne(targetEntity="App\Entity\Customer", inversedBy="cart", cascade={"persist", "remove"})
	 * @ORM\JoinColumn(nullable=false)
	 */
	public $customer;

	/**
	 * @ApiSubresource
	 * @ORM\OneToMany(targetEntity="App\Entity\CartItem", mappedBy="cart", orphanRemoval=true)
	 */
	private $items;

	public function __construct()
	{
		$this->items = new ArrayCollection();
	}

	public function getId(): ?int
	{
		return $this->id;
	}

	public function getCustomer(): ?Customer
	{
		return $this->customer;
	}

	public function setCustomer(Customer $customer): self
	{
		$this->customer = $customer;

		return $this;
	}

	/**
	 * @return Collection|CartItem[]
	 */
	public function getItems(): Collection
	{
		return $this->items;
	}

	public function addItem(CartItem $item): self
	{
		if (!$this->items->contains($item)) {
			$this->items[] = $item;
			$item->setCart($this);
		}

		return $this;
	}

	public function removeItem(CartItem $item): self
	{
		if ($this->items->contains($item)) {
			$this->items->removeElement($item);
			// set the owning side to null (unless already changed)
			if ($item->getCart() === $this) {
				$item->setCart(null);
			}
		}

		return $this;
	}
}
