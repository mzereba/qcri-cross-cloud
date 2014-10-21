/**
 * Sep 28, 2014
 * Data.java 
 * @author mzereba
 */
package org.qcri.crosscloud.utils;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * mzereba
 */
@XmlRootElement 
public class Query implements Serializable {
	
	 private String statement;

	/**
	 * @return the statement
	 */
	public String getStatement() {
		return statement;
	}

	/**
	 * @param statement the statement to set
	 */
	public void setStatement(String statement) {
		this.statement = statement;
	}
	 
	  
}
