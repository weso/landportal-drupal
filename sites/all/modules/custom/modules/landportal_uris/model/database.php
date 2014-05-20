<?php

/**
 * This class abstracts all accesses to the database.
 */
class DataBaseHelper {

  /**
   * Open a database connection.
   * @return the database connection or null if there was an error
   */
  public function open() {
    if (!$link = mysql_connect('localhost:3306', 'root', 'root')) {
      var_dump('Could not connect to mysql');
      return null;
    }
    if (!mysql_select_db('landportal', $link)) {
      var_dump('Could not select database');
      return null;
    }
    return $link;
  }

  /**
   * Send a query to the database.
   * @param $link the database connection
   * @param $sql_name the name of the sql query
   * @param $params the parameters of the sql query.
   * @return the result or null if there was an error.
   */
  public function query($link, $sql_name, $params) {
    $sql = $this->get_sql($sql_name, $params);
    $result = mysql_query($sql, $link);
    if (!$result) {
      var_dump("DB Error, could not query the database\n");
      var_dump('MySQL Error: ' . mysql_error() ."\n");
      return null;
    }
    $array = array();
    while ($row = mysql_fetch_assoc($result)) {
      array_push($array, $row);
    }
    mysql_free_result($result);
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
    $sql = (array)json_decode($file, true);
    $sql = $sql[$sql_name];
    for ($i = 0; $i < count($params); $i++) {
      $sql = str_replace("{".$i."}", $params[$i], $sql);
    }
    return $sql;
  }

  /**
   * Close the connection with the database.
   * @param $link The database connection to close.
   */
  public function close($link) {
    mysql_close($link);
  }

  /**
   * Get the content of the queries file.
   * Is important to use this function instead of opening the file directly because depending if
   * this file is being called directly or by Drupal it must use a different route.
   */
  private function get_queries_file() {
    $file = file_get_contents('../queries.json');
    if (empty($file))
      return file_get_contents(drupal_get_path("module", "landportal_uris")  .'/queries.json');
    else
      return $file;
  }

}
