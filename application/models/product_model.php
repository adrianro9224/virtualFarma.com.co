<?php
class Product_model extends CI_Model {
	
	function __construct()
	{
		// Call the Model constructor
		parent::__construct();
	}
	
	public function get_by_category_id($category_id) {
		
		$this->db->where('category_id', $category_id);
		$query = $this->db->get('product');
		
		if( $query->num_rows() > 0 ) {
			return $query->result();
		}
		
		return null;
	}
	
	public function create_produts_from_csv( $list_products ) {
		$product_ids = array();
		
		foreach ($list_products as $product ) {
			$data = array(
					"PLU" => $product->PLU,
					"barcode" => $product->barcode,
					"name" => $product->name,
					"category_id" => $product->category_id,
					"presentation" => $product->presentation,
					"description" => $product->presentation,
					"stock" => $product->stock,
					"price" => $product->price
					
			);
			
			$this->db->insert("product", $data);
			
			if( $this->db->affected_rows() == 1 )
				$product_ids[] = $this->db->insert_id();
		}
		
		return $product_ids;
		
	}
}