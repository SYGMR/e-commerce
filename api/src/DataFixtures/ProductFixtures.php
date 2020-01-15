<?php

namespace App\DataFixtures;

use App\Entity\Product;
use App\Entity\Category;
use Doctrine\Common\Persistence\ObjectManager;

class ProductFixtures extends BaseFixture
{
		public function loadData(ObjectManager $manager)
		{
				$this->createMany(Product::class, 150, function(Product $category, $count) {
						$category->setName($this->faker->productName)
							->setDescription($this->faker->text)
							->setPrice($this->faker->numberBetween(1, 9000))
							->setCategory($this->getRandomReference(Category::class))
							->setImages([
								'/img/imgProduct01.png',
								'/img/imgProduct02.png',
								'/img/imgProduct03.png',
								]);
				});

				$manager->flush();
		}
}
