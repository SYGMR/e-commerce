<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Annotation\ApiSubresource;

/**
 * @ApiResource(
 *     collectionOperations={
 *         "get",
 *         "post"={"security"="is_granted('ROLE_ADMIN')"}
 *     },
 *     itemOperations={
 *         "get",
 *         "put"={"security"="is_granted('ROLE_ADMIN') or object.user == user"},
 *     }
 * )
 * @ORM\Entity(repositoryClass="App\Repository\CustomerRepository")
 */
class Customer
{
	/**
	 * @ORM\Id()
	 * @ORM\GeneratedValue()
	 * @ORM\Column(type="integer")
	 */
	private $id;

	/**
	 * @ORM\Column(type="string", length=255)
	 */
	private $firstname;

	/**
	 * @ApiFilter(SearchFilter::class, strategy="ipartial")
	 * @ORM\Column(type="string", length=255)
	 */
	private $lastname;

	/**
	 * @ORM\Column(type="string", length=255)
	 */
	private $address;

	/**
	 * @ORM\OneToOne(targetEntity="App\Entity\Cart", mappedBy="customer", cascade={"persist", "remove"})
	 * @ApiSubresource
	 */
	private $cart;

	/**
	 * @ORM\OneToOne(targetEntity="App\Entity\User", cascade={"persist", "remove"})
	 * @ApiSubresource
	 */
	private $user;

	public function getId(): ?int
	{
		return $this->id;
	}

	public function getFirstname(): ?string
	{
		return $this->firstname;
	}

	public function setFirstname(string $firstname): self
	{
		$this->firstname = $firstname;
 
		return $this;
	}

	public function getLastname(): ?string
	{
		return $this->lastname;
	}

	public function setLastname(string $lastname): self
	{
		$this->lastname = $lastname;
 
		return $this;
	}

	public function getName(): string
	{
		return $this->firstname . ' ' . $this->lastname;
	}

	public function getAddress(): ?string
	{
		return $this->address;
	}

	public function setAddress(string $address): self
	{
		$this->address = $address;
 
		return $this;
	}

	public function getCart(): ?Cart
	{
		return $this->cart;
	}

	public function setCart(Cart $cart): self
	{
		$this->cart = $cart;
 
		// set the owning side of the relation if necessary
		if ($cart->getCustomer() !== $this) {
			$cart->setCustomer($this);
		}
 
		return $this;
	}

	public function getUser(): ?User
	{
			return $this->user;
	}

	public function setUser(?User $user): self
	{
			$this->user = $user;

			return $this;
	}

}
