<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\ProductRepository")
 */
class Product
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
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $description;

    /**
     * @ORM\Column(type="decimal")
     */
    private $price;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Category", inversedBy="products")
     * @ORM\JoinColumn(nullable=false)
     */
    private $category;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Status", inversedBy="products")
     * @ORM\JoinColumn(nullable=false)
     */
    private $status;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\CartItem", mappedBy="product", cascade={"persist", "remove"})
     */
    private $cartItem;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\SellerItem", mappedBy="product", orphanRemoval=true)
     */
    private $sellerItems;

    public function __construct()
    {
        $this->sellerItems = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getStatus(): ?Status
    {
        return $this->status;
    }

    public function setStatus(?Status $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCartItem(): ?CartItem
    {
        return $this->cartItem;
    }

    public function setCartItem(CartItem $cartItem): self
    {
        $this->cartItem = $cartItem;

        // set the owning side of the relation if necessary
        if ($cartItem->getProduct() !== $this) {
            $cartItem->setProduct($this);
        }

        return $this;
    }

    /**
     * @return Collection|SellerItem[]
     */
    public function getSellerItems(): Collection
    {
        return $this->sellerItems;
    }

    public function addSellerItem(SellerItem $sellerItem): self
    {
        if (!$this->sellerItems->contains($sellerItem)) {
            $this->sellerItems[] = $sellerItem;
            $sellerItem->setProduct($this);
        }

        return $this;
    }

    public function removeSellerItem(SellerItem $sellerItem): self
    {
        if ($this->sellerItems->contains($sellerItem)) {
            $this->sellerItems->removeElement($sellerItem);
            // set the owning side to null (unless already changed)
            if ($sellerItem->getProduct() === $this) {
                $sellerItem->setProduct(null);
            }
        }

        return $this;
    }
}
