<?php
/**
 * Written by: Ogunyemi Oludayo David
 * E-mail: ogunyemioludayo@gmail.com
 * Phone:  08074288823
 * Date: 14/03/2020
 * Time: 12:42 AM
 */


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST, OPTION");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once(__DIR__."/config.php");
include_once(__DIR__."/DB.php");

$type = isset($_REQUEST['type']) ? $_REQUEST['type'] : '';

$json = array('key'=>0,'txt'=>'Error No Data');

// Put all the values into variable
extract($_REQUEST);
extract($_FILES);

$db = DB::getInstance();

function calAge($dob){
  $birthDate = date("m/d/Y",strtotime($dob));
  $birthDate = explode("/", $birthDate);
  $age = (date("md", date("U", mktime(0, 0, 0, $birthDate[0], $birthDate[1], $birthDate[2]))) > date("md")
    ? ((date("Y") - $birthDate[2]) - 1)
    : (date("Y") - $birthDate[2]));  
	return $age;
}

/**
 * This is for add_person process
 */
if (trim($type) === 'add_person') {
	if (empty($first_name)) {
		$json = array('key' => 0, 'txt' => 'First Name cannot be empty');
	} else if (empty($last_name)) {
		$json = array('key' => 0, 'txt' => 'Last Name cannot be empty');
	} else if (empty($dob)) {
		$json = array('key' => 0, 'txt' => 'Please Select Date of Birth');
	} else if (calAge($dob) <= 14 || calAge($dob) >= 25) {
		$json = array('key' => 0, 'txt' => 'Age must be above 14 and below 25');
	} else if (empty($phone)) {
		$json = array('key' => 0, 'txt' => 'Phone number cannot be empty');
	} else if (empty($address)) {
		$json = array('key' => 0, 'txt' => 'Address Cannot be empty');
	} else {
		$data = [
			'first_name'=>$first_name,
			'last_name'=>$last_name,
			'dob'=>$dob,
			'phone'=>$phone,
			'address'=>$address,
		];
		$submit = $db->insert( 'people', $data );
		if($submit){			
			$json = array('key' => 1, 'txt' => 'A person has been added to the list of people');
		}else{
			$json = array('key' => 0, 'txt' => 'Unable to add person details at the moment');
		}
	}
}


/**
 * This is for edit_person process
 */
if (trim($type) === 'edit_person') {
	if (empty($first_name)) {
		$json = array('key' => 0, 'txt' => 'First Name cannot be empty');
	} else if (empty($last_name)) {
		$json = array('key' => 0, 'txt' => 'Last Name cannot be empty');
	} else if (empty($dob)) {
		$json = array('key' => 0, 'txt' => 'Please Select Date of Birth');
	} else if (calAge($dob) <= 14 || calAge($dob) >= 25) {
		$json = array('key' => 0, 'txt' => 'Age must be above 14 and below 25');
	} else if (empty($phone)) {
		$json = array('key' => 0, 'txt' => 'Phone number cannot be empty');
	} else if (empty($address)) {
		$json = array('key' => 0, 'txt' => 'Address Cannot be empty');
	} else if (empty($user_id)) {
		$json = array('key' => 0, 'txt' => 'Cannot update a person with no user ID');
	} else {
		$data = [
			'first_name'=>$first_name,
			'last_name'=>$last_name,
			'dob'=>$dob,
			'phone'=>$phone,
			'address'=>$address,
		];
		$where = array( 'id' => $user_id );
		$submit = $db->update( 'people', $data , $where, 1 );
		if($submit){			
			$json = array('key' => 1, 'txt' => 'A person has been updated among the list of people');
		}else{
			$json = array('key' => 0, 'txt' => 'Unable to update a person details at the moment');
		}
	}
}


/**
 * This is for delete_person process
 */
if (trim($type) === 'delete_person') {
	if (empty($user_id)) {
		$json = array('key' => 0, 'txt' => 'Cannot delete a person with no user ID');
	} else {
		$where = array( 'id' => $user_id );
		$submit = $db->delete( 'people', $where, 1 );
		if($submit){			
			$json = array('key' => 1, 'txt' => 'A person has been remove from the list of people');
		}else{
			$json = array('key' => 0, 'txt' => 'Unable to remove a person from the list of people at the moment');
		}
	}
}



/**
 * This is for get_one process
 */
if (trim($type) === 'get_one') {
	if (empty($user_id)) {
		$json = array('key' => 0, 'txt' => 'Cannot get details of a person with no user ID');
	} else {
		$sql = "SELECT * FROM `people` WHERE `id` = $user_id ";
		$data = $db->fetchOneRow($sql);
		if($data){			
			$json = array('key' => 1, 'txt' => $data);
		}else{
			$json = array('key' => 0, 'txt' => 'Unable to to get person data at the moment');
		}
	}
}


/**
 * This is for get_all process
 */
if (trim($type) === 'get_all') {	
	$sql = "SELECT * FROM `people` ";
	$data = $db->fetchAllRows($sql);
	if($data){			
		$json = array('key' => 1, 'txt' => $data);
	}else{
		$json = array('key' => 0, 'txt' => 'Unable to to get people at the moment');
	}
}


echo json_encode($json);
exit();