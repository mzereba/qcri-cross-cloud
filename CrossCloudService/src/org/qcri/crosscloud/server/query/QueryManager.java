package org.qcri.crosscloud.server.query;


//import com.hp.hpl.jena.tdb.*;
import com.hp.hpl.jena.query.*;
//import com.hp.hpl.jena.rdf.model.*;

import org.qcri.crosscloud.server.query.QueryConstants;

public class QueryManager {
	private String queryString;
	private Query query;
//	private Dataset dataset;
//	private Model model;
	private QueryExecution qexec;
	private ResultSet results;
	private ResultSet results_view;
	
	public void test(){
		
	}
	
//	public void initializeDataset(String TDBDirectory){
//		dataset = TDBFactory.createDataset(TDBDirectory);
//		model = dataset.getDefaultModel();
//	}
	
	public ResultSet getStorageSpace(String userID){
		queryString = "select ?o where{" + "<" + userID + "> " + QueryConstants.getStoragePredicate() + " ?o}";
		results = executeQuery(queryString);
		return results;
	}
	
	public ResultSet getSubTree(String subject){
		queryString = "select ?o where{" + "<" + subject + "> " + QueryConstants.getContainsPredicate() + " ?o}";
		results = executeQuery(queryString);
		return results;
	}
	
	public ResultSet executeQuery(String queryString){
		String service = "http://localhost:3030/ds/query";
		QueryExecution qe = QueryExecutionFactory.sparqlService(service, queryString);
		results = qe.execSelect();
		results_view = this.results;
		return results;
	}
	
	
	public void printLastResultSet(){
		System.out.println("Query: " + queryString);
		System.out.println("Result Set:");
		ResultSetFormatter.out(System.out, results_view, query);
	}
	
	public void closeQuery(){
		qexec.close();
	}

	public ResultSet getAllTriples(String subject) {
		queryString = "select ?s ?p ?o where{" + "<" + subject + "> ?p ?o}";
		results = executeQuery(queryString);
		return results;
	}
}
