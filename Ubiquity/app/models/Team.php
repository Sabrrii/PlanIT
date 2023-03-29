<?php
namespace models;

use Ubiquity\attributes\items\Id;
use Ubiquity\attributes\items\Column;
use Ubiquity\attributes\items\Validator;
use Ubiquity\attributes\items\Table;
use Ubiquity\attributes\items\OneToMany;
use Ubiquity\attributes\items\ManyToOne;
use Ubiquity\attributes\items\JoinColumn;
use Ubiquity\attributes\items\ManyToMany;
use Ubiquity\attributes\items\JoinTable;

#[Table(name: "team")]
class Team{
	
	#[Id()]
	#[Column(name: "id",dbType: "int(11)")]
	#[Validator(type: "id",constraints: ["autoinc"=>true])]
	private $id;

	
	#[Column(name: "name",nullable: true,dbType: "varchar(100)")]
	#[Validator(type: "length",constraints: ["max"=>"100"])]
	private $name;

	
	#[OneToMany(mappedBy: "team",className: "models\\Room")]
	private $rooms;

	
	#[ManyToOne()]
	#[JoinColumn(className: "models\\User_",name: "idCreator")]
	private $user_;

	
	#[ManyToMany(targetEntity: "models\\User_",inversedBy: "teams")]
	#[JoinTable(name: "team_users",inverseJoinColumns: ["name"=>"idUser","referencedColumnName"=>"id"])]
	private $user_s;

	 public function __construct(){
		$this->rooms = [];
		$this->users = [];
	}

	public function getId(){
		return $this->id;
	}

	public function setId($id){
		$this->id=$id;
	}

	public function getName(){
		return $this->name;
	}

	public function setName($name){
		$this->name=$name;
	}

	public function getRooms(){
		return $this->rooms;
	}

	public function setRooms($rooms){
		$this->rooms=$rooms;
	}

	 public function addToRooms($room){
		$this->rooms[]=$room;
		$room->setTeam($this);
	}

	public function getUser_(){
		return $this->user_;
	}

	public function setUser_($user_){
		$this->user_=$user_;
	}

	public function getUser_s(){
		return $this->user_s;
	}

	public function setUser_s($user_s){
		$this->user_s=$user_s;
	}

	 public function addUser_($user_){
		$this->user_s[]=$user_;
	}

	 public function __toString(){
		return ($this->name??'no value').'';
	}

	public function getUser(){
		return $this->user;
	}
	public function setUser($user){
		$this->user=$user;
	}
	public function getUsers(){
		return $this->users;
	}
	public function setUsers($users){
		$this->users=$users;
	}
	 public function addUser($user){
		$this->users[]=$user;
	}

}