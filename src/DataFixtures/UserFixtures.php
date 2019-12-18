<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {

        $user = new User();
        $user->setUsername('user');
        $user->setEmail('user@localhost');
        $user->setPassword('user');
        
        $manager->persist($user);

        $userAdmin = new User();
        $userAdmin->setUsername('admin');
        $userAdmin->setEmail('admin@localhost');
        $userAdmin->setPassword('admin');
        $userAdmin->setRoles(["ROLE_ADMIN"]);

        $manager->persist($userAdmin);
        $manager->flush();
    }
}