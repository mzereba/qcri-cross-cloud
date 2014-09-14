/**
 * Aug 31, 2014
 * AttributesBean.java 
 * @author mzereba
 */
package org.qcri.crosscloud.utils;

import java.util.Date;

/**
 *
 * mzereba
 */
public class AttributesBean {
	
	private String name;
	private double size;
	private boolean type; //True for RDF, False for Directory
	private Date lastModified;
	
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return the size
	 */
	public double getSize() {
		return size;
	}
	/**
	 * @param size the size to set
	 */
	public void setSize(double size) {
		this.size = size;
	}
	/**
	 * @return the type
	 */
	public boolean isType() {
		return type;
	}
	/**
	 * @param type the type to set
	 */
	public void setType(boolean type) {
		this.type = type;
	}
	/**
	 * @return the lastModified
	 */
	public Date getLastModified() {
		return lastModified;
	}
	/**
	 * @param lastModified the lastModified to set
	 */
	public void setLastModified(Date lastModified) {
		this.lastModified = lastModified;
	}
	

}
