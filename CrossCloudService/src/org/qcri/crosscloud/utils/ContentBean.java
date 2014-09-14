/**
 * Aug 31, 2014
 * ContentBean.java 
 * @author mzereba
 */
package org.qcri.crosscloud.utils;

import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * mzereba
 */
@XmlRootElement 
public class ContentBean {
	
	private String username;
	private AttributesBean attributes;
	private RDFBean rdf;
	private ACLBean acl;
	
	/**
	 * @return the attributes
	 */
	public AttributesBean getAttributes() {
		return attributes;
	}
	
	/**
	 * @param attributes the attributes to set
	 */
	public void setAttributes(AttributesBean attributes) {
		this.attributes = attributes;
	}
	
	/**
	 * @return the rdf
	 */
	public RDFBean getRDF() {
		return rdf;
	}
	
	/**
	 * @param rdf the rdf to set
	 */
	public void setRDF(RDFBean rdf) {
		this.rdf = rdf;
	}
	
	/**
	 * @return the acl
	 */
	public ACLBean getACL() {
		return acl;
	}
	
	/**
	 * @param acl the acl to set
	 */
	public void setACL(ACLBean acl) {
		this.acl = acl;
	}

	/**
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * @param username the username to set
	 */
	public void setUsername(String username) {
		this.username = username;
	}

}
