package org.qcri.crosscloud.server.query;

public class QueryReceiver {

	private String queryType;
	
	public String receiveQuery(){
		setQueryType("GET");
		String query = "http://ahmedelroby.rww.io/storage/robyblog/ch1/post1";
		// Receive Query Here
		
		
		return query;
	}

	public String getQueryType() {
		return queryType;
	}

	private void setQueryType(String queryType) {
		this.queryType = queryType;
	}

	
	
}
