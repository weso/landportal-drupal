<?php

/**
 * This class abstracts all accesses to the database.
 */
class DataBaseHelper {

    private $mysql;
    private $db_url = '127.0.0.1';
    private $db_user = 'root';
    private $db_pass = 'root';
    private $db_name = 'landportal';

    /**
     * Open a new database connection
     */
    public function open() {
        $this->mysql = new mysqli($this->db_url, $this->db_user, $this->db_pass, $this->db_name);
        if ($this->mysql->connect_errno) {
            $message = 'Failed to connect to MySQL ('. $this->mysql->connect_errno .')'. $this->mysql->connect_error;
            drupal_set_message($message, 'error');
        }
    }

    /**
     * Execute a named query in the database.
     *
     * $sql_name The query name as defined in the queries file
     * $params array with the parameters of the query
     */
    public function query($sql_name, $params) {
        $sql = $this->get_sql($sql_name, $params);
        $result = $this->mysql->query($sql);
        if (!$result) {
            $message = 'Query failed ('. $this->mysql->errno .')'. $this->mysql->error;
            drupal_set_message($message, 'error');
            return null;
        }
        return $this->transform_result_in_array($result);
    }

    /**
     * Execute a query in the database.  Use carefully.
     */
    public function direct_query($query, $params) {
        foreach ($params as $order => $param) {
            $escaped = $this->mysql->real_escape_string($param);
            $query = str_replace("{".$order."}", $escaped, $query);
        }
        $result = $this->mysql->query($query);
        if (!$result) {
            $message = 'Query failed ('. $this->mysql->errno .')'. $this->mysql->error;
            drupal_set_message($message, 'error');
            return null;
        }
        return $this->transform_result_in_array($result);
    }

    public function execute_statement($statement) {
        $this->mysql->query($statement);
    }

    /**
     * Transforms the result of a query in an array.
     */
    private function transform_result_in_array($result) {
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
    private function get_sql($sql_name, $params) {
        $file = $this->get_queries_file();
        $queries = (array)json_decode($file, true);
        $sql = $queries[$sql_name];
        foreach ($params as $order => $param) {
            $sql = str_replace("{".$order."}", $param, $sql);
        }
        return $sql;
    }

    /**
     * Close the current connection.
     */
    public function close() {
        $this->mysql->close();
    }

    /**
     * Return the file containing the queries
     */
    private function get_queries_file() {
        if (function_exists('drupal_get_path')) {
            return file_get_contents(drupal_get_path("module", "landportal_uris")  .'/database/queries.json');
        } else {
            return file_get_contents('../queries.json');
        }
    }
}
