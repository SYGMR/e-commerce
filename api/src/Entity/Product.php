<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

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
	 * @ApiFilter(SearchFilter::class, strategy="ipartial")
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
	 * @ORM\Column(type="json")
	 */
	private $images = [];

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\CartItem", mappedBy="product", orphanRemoval=true)
     */
    private $cartItems;

	public function __construct()
               	{
               		$this->sellerItems = new ArrayCollection();
                 $this->cartItems = new ArrayCollection();
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

		public function getImages(): ?array
		{
				return $this->images;
		}

		public function setImages(array $images): self
		{
				$this->images = $images;

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
          $cartItem->setProduct($this);
      }

      return $this;
  }

  public function removeCartItem(CartItem $cartItem): self
  {
      if ($this->cartItems->contains($cartItem)) {
          $this->cartItems->removeElement($cartItem);
          // set the owning side to null (unless already changed)
          if ($cartItem->getProduct() === $this) {
              $cartItem->setProduct(null);
          }
      }

      return $this;
  }

}
