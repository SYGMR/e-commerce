<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiSubresource;

/**
 * @ApiResource
 * @ORM\Entity(repositoryClass="App\Repository\CartRepository")
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
	private $cartItems;

	public function __construct()
	{
		$this->cartItems = new ArrayCollection();
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
	public function getCartItems(): Collection
	{
		return $this->cartItems;
	}

	public function addCartItem(CartItem $cartItem): self
	{
		if (!$this->cartItems->contains($cartItem)) {
			$this->cartItems[] = $cartItem;
			$cartItem->setCart($this);
		}

		return $this;
	}

	public function removeCartItem(CartItem $cartItem): self
	{
		if ($this->cartItems->contains($cartItem)) {
			$this->cartItems->removeElement($cartItem);
			// set the owning side to null (unless already changed)
			if ($cartItem->getCart() === $this) {
				$cartItem->setCart(null);
			}
		}

		return $this;
	}
}
