<?php

/**
 * This class abstracts all accesses to the database.
 */
class DataBaseHelper {

    private $mysql;
    private $db_url;
    private $db_user;
    private $db_pass;
    private $db_name;

    function __construct() {
        $config_file = file_get_contents(dirname(__FILE__) .'/config.json');
        $config = (array)json_decode($config_file, true);
        $this->db_url = $config['database_url'];
        $this->db_user = $config['database_user'];
        $this->db_pass = $config['database_pass'];
        $this->db_name = $config['database_name'];
    }

    /**
     * Open a new database connection
     */
    public function open() {
        $this->mysql = new mysqli($this->db_url, $this->db_user, $this->db_pass, $this->db_name);
        if ($this->mysql->connect_errno) {
            $message = 'Failed to connect to MySQL ('. $this->mysql->connect_errno .')'. $this->mysql->connect_error;
            var_dump($message);
        }
    }

    /**
     * Execute a named query in the database.
     *
     * @param $sql_name The query name as defined in the queries file
     * @param $params array with the parameters of the query
     */
    public function query($sql_name, $params) {
        $sql = $this->_get_sql($sql_name, $params);
        $result = $this->_execute_in_database($sql);
        return $this->_transform_result_in_array($result);
    }

    /**
     * Execute an unnamed query in the database.  Use carefully.
     *
     * @param $query The query to execute
     * @param $params array with the parameters of the query
     */
    public function direct_query($query, $params) {
        $query = $this->_bind_parameters($sql, $params);
        $result = $this->_execute_in_database($query);
        return $this->_transform_result_in_array($result);
    }

    /** 
     * Execute a named statement in the database such as an UPDATE or DELETE.
     *
     * @param $sql_name The statement name as defined in the queries file
     * @param params Array with the parameters of the query
     */
    public function execute_statement($sql_name, $params) {
        $sql = $this->_get_sql($sql_name, $params);
        return $this->_execute_in_database($sql);
    }

    /**
     * Execute an unnamed statement with no return in the database such as
     * an UPDATE or DELETE.  Use carefully.
     */
    public function direct_execute_statement($sql, $params) {
        $query = $this->_bind_parameters($sql, $params);
        return $this->_execute_in_database($query);
    }

    /**
     * Executes a query or statement in the database.
     *
     * @param $query Query to execute
     */
    private function _execute_in_database($query) {
        $result = $this->mysql->query($query);
        if (!$result) {
            $message = 'Query failed ('. $this->mysql->errno .')'. $this->mysql->error;
            var_dump("There was an error contacting the database: $message");
            return null;
        }
        return $result;
    }

    /**
     * Close the current connection.
     */
    public function close() {
        $this->mysql->close();
    }

    /**
     * Escapes an string.  Use this function to make parameters given by the user safe
     * before sending them to the database. 
     */
    public function escape($string) {
        return $this->mysql->escape_string($string);
    }

    /**
     * Transforms the result of a query in an array.
     *
     * @param $result Result as returned from the database query
     */
    private function _transform_result_in_array($result) {
        $array = array();
        while ($row = $result->fetch_assoc()) {
            array_push($array, $row);
        }
        return $array;
    }

    /**
     * Get an SQL query from the queries file.
     * @param $sql_name the name of the SQL query to return
     * @param $params the parameters to set in the query
     * @return the SQL query with the parameters set
     */
    private function _get_sql($sql_name, $params) {
        $file = $this->_get_queries_file();
        $queries = (array)json_decode($file, true);
        $sql = $queries[$sql_name];
        return $this->_bind_parameters($sql, $params);
    }

    /**
     * Binds the parameters in a query.
     *
     * @param $query The query to bind the parameters in.  Strings such as {0} or {1} will be
     *      replaced with the first and second parameters in the param list.
     * @param $params Parameters to bind in the query
     */
    private function _bind_parameters($query, $params) {
        foreach ($params as $order => $param) {
            $query = str_replace("{".$order."}", $param, $query);
        }
        return $query;
    }

    /**
     * Return the file containing the queries
     */
    private function _get_queries_file() {
        return file_get_contents(dirname(__FILE__) .'/queries.json');
    }
}
