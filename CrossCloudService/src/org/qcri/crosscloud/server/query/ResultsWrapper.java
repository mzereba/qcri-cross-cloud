package org.qcri.crosscloud.server.query;

import java.io.ByteArrayOutputStream;

import com.hp.hpl.jena.query.QuerySolution;
import com.hp.hpl.jena.query.ResultSet;
import com.hp.hpl.jena.query.ResultSetFormatter;

public class ResultsWrapper {

	ResultSet results;
	
	public ResultsWrapper(ResultSet results) {
		this.results = results;
	}
	
	public String getResultsAsJSON(){
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		ResultSetFormatter.outputAsJSON(baos, results);
		return baos.toString();
	}
	
	public void printResults(){
		
		while(results.hasNext()){
			
			QuerySolution soln = results.nextSolution();
			System.out.println(soln.toString());
		}
		
	}
	
	
}
