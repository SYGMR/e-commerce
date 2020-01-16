<?php

namespace App\DataFixtures;

use App\Entity\ShopItem;
use App\Entity\Shop;
use App\Entity\Product;
use Doctrine\Common\Persistence\ObjectManager;

class ShopItemFixtures extends BaseFixture
{
		public function loadData(ObjectManager $manager)
		{
				$this->createMany(ShopItem::class, 500, function(ShopItem $shopItem, $count) {
							$shopItem->setProduct($this->getRandomReference(Product::class))
							->setShop($this->getRandomReference(Shop::class));
				});

				$manager->flush();
		}
}
