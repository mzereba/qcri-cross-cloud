/**
 * Aug 31, 2014
 * RDFResource.java 
 * @author mzereba
 */
package org.qcri.crosscloud.ws;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.xml.bind.annotation.XmlElement;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.ObjectWriter;
import org.codehaus.jackson.map.SerializationConfig;
import org.qcri.crosscloud.utils.ACLBean;
import org.qcri.crosscloud.utils.AttributesBean;
import org.qcri.crosscloud.utils.ContentBean;
import org.qcri.crosscloud.utils.RDFBean;

import server.query.QueryManager;

import com.hp.hpl.jena.query.QuerySolution;
import com.hp.hpl.jena.query.ResultSet;
import com.hp.hpl.jena.rdf.model.RDFNode;
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
	 * @return The list of ContentBeans to set in the response
	 */
	@GET
	@XmlElement(name = "contentbean")
	@Path("/retrieveContent")
	@Produces(MediaType.APPLICATION_JSON)
	public String retrieve(@QueryParam("username") String Username, @QueryParam("path") String Path) {
	    
		ArrayList<ContentBean> lContentBeans = getAnswers("http://ahmedelroby.rww.io/", Path);
    
	/*//	
		ContentBean oContentBean = buildResult(Username, Path);
     	List<ContentBean> lContentBeans = new ArrayList<ContentBean>();
    	lContentBeans.add(oContentBean);
   //*/ 	
		
		String jsonString = serializeListToJSON(lContentBeans);
		
		return jsonString;
	}
	
	/**
	 * 
	 * @param sUsername web id of user
	 * @param sPath current path
	 * @return a populated ContentBean
	 */
	public static ArrayList<ContentBean> getAnswers(String sUsername, String sPath){
		ArrayList<ContentBean> contentBeans = new ArrayList<ContentBean>();
		ResultSet results;
		// Initialize Query Manager
		QueryManager qManager = new QueryManager();
		if(sPath.equals("")){
			results = qManager.getStorageSpace(sUsername);
		}
		else if(sPath.endsWith("/")){
			results = qManager.getSubTree(sPath);
			
		}
		else{
			results = qManager.getAllTriples(sPath);
		}
		if(sPath.endsWith("/") || sPath.equals("")){
			while(results.hasNext()){
				QuerySolution soln = results.nextSolution();
				RDFNode x = soln.get("o");
				
				// Fill AttributeBean
				AttributesBean aB = new AttributesBean();
				aB.setName(x.toString());
				aB.setType(false);
				aB.setSize(-1);
				aB.setLastModified(new Date());
				
				// ACLBean Empty
				ACLBean aclB = new ACLBean();
				RDFBean rdfB = new RDFBean();
				
				// Fill ContentBean
				ContentBean cB = new ContentBean();
				cB.setUsername(sUsername); //From request
				cB.setAttributes(aB);
				cB.setACL(aclB);
				cB.setRDF(rdfB);
				
				contentBeans.add(cB);
			}
		}
		else{
			String rdfFile = "";
			while(results.hasNext()){				
				rdfFile += "<" + sPath + "> ";
				QuerySolution soln = results.nextSolution();
				RDFNode x = soln.get("p");
				rdfFile += "<" + x.toString() + "> ";
				x = soln.get("o");
				rdfFile += "<" + x.toString() + ">.\n";
			}
			System.out.println("RDF File returned:\n" + rdfFile);
			// Fill AttributeBean
			AttributesBean aB = new AttributesBean();
			aB.setType(true);
			// ACLBean Empty
			ACLBean aclB = new ACLBean();
			
			RDFBean rdfB = new RDFBean();
			rdfB.setText(rdfFile);
			
			// Fill ContentBean
			ContentBean cB = new ContentBean();
			cB.setUsername(sUsername); //From request
			cB.setAttributes(aB);
			cB.setACL(aclB);
			cB.setRDF(rdfB);
			
			contentBeans.add(cB);
		}
		
	    return contentBeans;
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
		if("".equals(sPath)){
			aB.setName("profile/");
		}else{
			aB.setName("profile/card/"); //From request
		}
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
	
	/**
	 * Method for serializing an array to JSON
	 * @param List
	 * 
	 * @return JSON String
	 */
	public static String serializeListToJSON(List<ContentBean> l){
		ObjectWriter ow = new ObjectMapper()
		.configure(SerializationConfig.Feature.FAIL_ON_EMPTY_BEANS, false)
		.writer()
		.withDefaultPrettyPrinter();
		
		String jsonS = "";
		
		try {
			jsonS = ow.writeValueAsString(l);
		} catch (JsonGenerationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return jsonS;
	}

}
