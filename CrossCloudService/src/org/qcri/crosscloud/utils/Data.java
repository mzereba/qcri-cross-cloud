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
public class Data implements Serializable {
	
	 private String path;
	 private String rdf;
	
	  /**
	 * @return the path
	 */
	public String getPath() {
		return path;
	}
	/**
	 * @param path the path to set
	 */
	public void setPath(String path) {
		this.path = path;
	}
	/**
	 * @return the rdf
	 */
	public String getRdf() {
		return rdf;
	}
	/**
	 * @param rdf the rdf to set
	 */
	public void setRdf(String rdf) {
		this.rdf = rdf;
	}
}
