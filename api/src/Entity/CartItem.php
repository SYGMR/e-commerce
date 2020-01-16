<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiSubresource;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\CartItemRepository")
 */
class CartItem
{
	/**
	 * @ORM\Id()
	 * @ORM\GeneratedValue()
	 * @ORM\Column(type="integer")
	 */
	private $id;

	/**
	 * @ORM\ManyToOne(targetEntity="App\Entity\Cart", inversedBy="cartItems")
	 * @ORM\JoinColumn(nullable=false)
	 * @ApiSubresource
	 */
	private $cart;

	/**
	 * @ORM\Column(type="integer")
	 */
	private $quantity;

	/**
	* @ORM\ManyToOne(targetEntity="App\Entity\ShopItem", inversedBy="cartItems")
	* @ORM\JoinColumn(nullable=false)
	* @ApiSubresource
	*/
	private $shopItem;

	public function getId(): ?int
	{
		return $this->id;
	}

	public function getCart(): ?Cart
	{
		return $this->cart;
	}

	public function setCart(?Cart $cart): self
	{
		$this->cart = $cart;

		return $this;
	}

	public function getQuantity(): ?int
	{
		return $this->quantity;
	}

	public function setQuantity(int $quantity): self
	{
		$this->quantity = $quantity;

		return $this;
	}

	public function getShopItem(): ?ShopItem
	{
		return $this->shopItem;
	}

	public function setShopItem(?ShopItem $shopItem): self
	{
		$this->shopItem = $shopItem;

		return $this;
	}
}
