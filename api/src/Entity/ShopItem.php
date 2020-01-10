<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiSubresource;

/**
 * @ApiResource(
 *     attributes={"security"="is_granted('ROLE_USER')"},
 *     collectionOperations={
 *         "get",
 *         "post"={"security"="is_granted('ROLE_ADMIN')"}
 *     },
 *     itemOperations={
 *         "get",
 *         "put"={"security"="is_granted('ROLE_ADMIN') or object.shop == user.merchant.shop"},
 * 		   "delete"={"security"="is_granted('ROLE_ADMIN') or object.shop == user.merchant.shop"}
 *     }
 * )
 * @ORM\Entity(repositoryClass="App\Repository\ShopItemRepository")
 */
class ShopItem
{
	/**
	 * @ORM\Id()
	 * @ORM\GeneratedValue()
	 * @ORM\Column(type="integer")
	 */
	private $id;

	/**
	 * @ORM\ManyToOne(targetEntity="App\Entity\Product")
	 * @ORM\JoinColumn(nullable=false)
	 * @ApiSubresource
	 */
	private $product;

	/**
	 * @ORM\ManyToOne(targetEntity="App\Entity\Shop", inversedBy="items")
	 */
	private $shop;

	/**
	 * @ORM\Column(type="integer")
	 */
	private $quantity;

	public function __construct()
	{
	}

	public function getId(): ?int
	{
		return $this->id;
	}

	public function getProduct(): ?Product
	{
		return $this->product;
	}

	public function setProduct(?Product $product): self
	{
		$this->product = $product;

		return $this;
	}

	/**
	 * @return Shop
	 */
	public function getShop(): Shop
	{
		return $this->shop;
	}

	public function setShop(Shop $shop): self
	{
		$this->shop = $shop;
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
}
