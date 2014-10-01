package org.qcri.crosscloud.server.query;

public class QueryConstants {
	
	private static String storagePredicate = "<http://www.w3.org/ns/pim/space#storage>";
	private static String containsPredicate = "<http://www.w3.org/ns/ldp#contains>";
	private static String namePredicate = "<http://xmlns.com/foaf/0.1/name>";
	private static String imgPredicate = "<http://xmlns.com/foaf/0.1/img>";
	private static String linkPredicate = "<http://rdfs.org/sioc/ns#link>";
	private static String hasCreatorPredicate = "<http://rdfs.org/sioc/ns#has_creator>";
	private static String titlePredicate = "<http://purl.org/dc/terms/title>";
	private static String createdDatePredicate = "<http://purl.org/dc/terms/created>";
	private static String contentPredicate = "<http://rdfs.org/sioc/ns#content>";
	
	private static String queryGet = "GET";
	private static String queryPOST = "POST";
	private static String queryPUT = "PUT";
	private static String queryDELETE = "DELETE";
	/**
	 * @return the queryGet
	 */
	public static String getQueryGet() {
		return queryGet;
	}
	/**
	 * @return the queryPOST
	 */
	public static String getQueryPOST() {
		return queryPOST;
	}
	/**
	 * @return the queryPUT
	 */
	public static String getQueryPUT() {
		return queryPUT;
	}
	/**
	 * @return the queryDELETE
	 */
	public static String getQueryDELETE() {
		return queryDELETE;
	}
	/**
	 * @return the storagePredicate
	 */
	public static String getStoragePredicate() {
		return storagePredicate;
	}
	/**
	 * @return the containsPredicate
	 */
	public static String getContainsPredicate() {
		return containsPredicate;
	}
	/**
	 * @return the namePredicate
	 */
	public static String getNamePredicate() {
		return namePredicate;
	}
	/**
	 * @return the imgPredicate
	 */
	public static String getImgPredicate() {
		return imgPredicate;
	}
	/**
	 * @return the linkPredicate
	 */
	public static String getLinkPredicate() {
		return linkPredicate;
	}
	/**
	 * @return the hasCreatorPredicate
	 */
	public static String getHasCreatorPredicate() {
		return hasCreatorPredicate;
	}
	/**
	 * @return the titlePredicate
	 */
	public static String getTitlePredicate() {
		return titlePredicate;
	}
	/**
	 * @return the createdDatePredicate
	 */
	public static String getCreatedDatePredicate() {
		return createdDatePredicate;
	}
	/**
	 * @return the contentPredicate
	 */
	public static String getContentPredicate() {
		return contentPredicate;
	}
	
}
