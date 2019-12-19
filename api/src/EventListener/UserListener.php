<?php
// src/EventListener/UserChangedNotifier.php
namespace App\EventListener;

use App\Entity\User;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserListener
{

	private $encoder;

	public function __construct(UserPasswordEncoderInterface $encoder)
	{
		$this->encoder = $encoder;
	}

	public function prePersist(User $user, LifecycleEventArgs $event) {
		$password = $this->encoder->encodePassword($user, $user->getPassword());
		$user->setPassword($password);
	}

}