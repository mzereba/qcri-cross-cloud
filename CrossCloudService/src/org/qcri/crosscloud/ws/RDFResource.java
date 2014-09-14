/**
 * Aug 31, 2014
 * RDFResource.java 
 * @author mzereba
 */
package org.qcri.crosscloud.ws;

import java.util.Date;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.xml.bind.annotation.XmlElement;

import org.qcri.crosscloud.utils.ACLBean;
import org.qcri.crosscloud.utils.AttributesBean;
import org.qcri.crosscloud.utils.ContentBean;
import org.qcri.crosscloud.utils.RDFBean;

import com.sun.jersey.spi.resource.Singleton;

/**
 * REST Resource class for retrieving RDF data
 * 
 * mzereba
 */
@Path("RDF")
@Singleton
public class RDFResource {
		 
	/**
	 * Method for parsing REST request
	 * 
	 * @param Username
	 * @param Path
	 * 
	 * @return The ContentBean to set in the response
	 */
	@GET
	@XmlElement(name = "contentbean")
	@Path("/retrieveContent")
	@Produces(MediaType.APPLICATION_JSON)
	public ContentBean retrieve(@QueryParam("username") String Username, @QueryParam("path") String Path) {
		ContentBean oContentBean = buildResult(Username, Path);
	    return oContentBean;
	}

	/**
	 * Method for hardcoding a retrieval of an element from the source
	 * 
	 * @param sUsername username currently used
	 * @param sPath Current path
	 * 
	 * @return A built ContentBean
	 */
	public static ContentBean buildResult(String sUsername, String sPath){
		
		//Scenario of retrieving an element that is a Directory (so no ACL)
		AttributesBean aB = new AttributesBean();
		aB.setName("profile/"); //From request
		aB.setType(false);  //Hard coded for testing purposes
		aB.setSize(0.2);   //Hard coded for testing purposes
		aB.setLastModified(new Date());
		
		ACLBean aclB = new ACLBean();
		RDFBean rdfB = new RDFBean();
		
		ContentBean cB = new ContentBean();
		cB.setUsername(sUsername); //From request
		cB.setAttributes(aB);
		cB.setACL(aclB);
		cB.setRDF(rdfB);
		
		return cB;
	}

}
