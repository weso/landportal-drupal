<?php
	
/**
 * Returns the user_id of a session_id
 */
function _session_retrieve($sid) {
	// select uid from sessions where s.sid = sid
	return db_select('sessions', 's')
	    ->fields('s', array('uid'))
	    ->condition('sid', $sid)
	    ->execute()
	    ->fetchField();
}

/**
 * Allows all access
 */
function _session_access_callback() {
	return TRUE;
}