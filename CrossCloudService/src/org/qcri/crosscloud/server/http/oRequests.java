/**
 * Aug 31, 2014
 * Requests.java 
 * @author mzereba,ahmed,essam
 */
package org.qcri.crosscloud.server.http;


import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;
import javax.xml.bind.annotation.XmlElement;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.ObjectWriter;
import org.codehaus.jackson.map.SerializationConfig;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.sail.SailRepository;
import org.qcri.crosscloud.server.query.QueryManager;
import org.qcri.crosscloud.server.query.ResultsWrapper;
import org.qcri.crosscloud.utils.ACLBean;
import org.qcri.crosscloud.utils.AttributesBean;
import org.qcri.crosscloud.utils.ContentBean;
import org.qcri.crosscloud.utils.Data;
import org.qcri.crosscloud.utils.Query;
import org.qcri.crosscloud.utils.RDFBean;

import com.fluidops.fedx.Config;
import com.fluidops.fedx.FedXFactory;
import com.hp.hpl.jena.query.QuerySolution;
import com.hp.hpl.jena.query.ResultSet;
import com.hp.hpl.jena.rdf.model.RDFNode;
import com.hp.hpl.jena.update.UpdateExecutionFactory;
import com.hp.hpl.jena.update.UpdateFactory;
import com.hp.hpl.jena.update.UpdateProcessor;
import com.hp.hpl.jena.update.UpdateRequest;
import com.sun.jersey.spi.resource.Singleton;







import org.openrdf.query.QueryLanguage;
import org.openrdf.model.Graph;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.sail.SailRepository;

import com.fluidops.*;
import com.fluidops.fedx.Config;
import com.fluidops.fedx.FedX;
import com.fluidops.fedx.FedXFactory;
import com.fluidops.fedx.FederationManager;
import com.fluidops.fedx.cache.MemoryCache;
import com.fluidops.fedx.exception.FedXException;
import com.fluidops.fedx.monitoring.MonitoringImpl;
import com.fluidops.fedx.monitoring.MonitoringUtil;
import com.fluidops.fedx.structures.Endpoint;

import java.net.URL;
import java.net.URLClassLoader;

/**
 * REST Resource class for retrieving and manipulating  RDF data
 * 
 * mzereba,ahmed,essam
 */
@Path("RDF")
@Singleton
public class oRequests {
	
	
	@GET
 	@Path("count")
 	@Produces(MediaType.TEXT_PLAIN)
 	public String getCount() {
 		int count = 30;
 		return String.valueOf(count);
	}
	
	@GET
 	@Path("{url:.*}")
 	//@Produces(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
 	public String getURL(@PathParam("url") String url, @Context UriInfo ui) {
		
		String Path= ui.getRequestUri().toString();
		ArrayList<ContentBean> lContentBeans = getAnswers("essam", Path);
		String jsonString = serializeListToJSON(lContentBeans);
		
 		return jsonString;
	}
	
	/**
	 * Method for parsing REST request
	 * 
	 * @param Path
	 * 
	 * @delete The list of ContentBeans to set in the response
	 */
	@DELETE
	@XmlElement(name = "contentbean")
	@Path("/delete")
	@Produces(MediaType.APPLICATION_JSON)
	public void delete(@QueryParam("path") String Path) {
	    
		deleteURI(Path);
		
		
	}
	
	/**
	 * Method for parsing REST request
	 * 
	 * @param data.Path data.content
	 * 
	 * @insert The list of ContentBeans to set in the response
	 */
	@POST
	@XmlElement(name = "data")
	@Path("/insert")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void insert(Data data) {
	    
		insertURI(data.getPath(), data.getRdf());
		
	}
	
	/**
	 * Method for parsing REST request
	 * 
	 * @param data.Path data.content
	 * 
	 * @update The list of ContentBeans to set in the response
	 */
	@POST
	@XmlElement(name = "data")
	@Path("/update")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void update(Data data) {
	    
		//updateURI(data.getPath(), StringUtils.newStringUtf8(Base64.decodeBase64(data.getRdf())));
		updateURI(data.getPath(), data.getRdf());
		
	}
		 
	/**
	 * Method for parsing REST request
	 * 
	 * @param Username
	 * @param Password
	 * 
	 * @return The list of ContentBeans to set in the response if it is valid user
	 */
	@GET
	@XmlElement(name = "contentbean")
	@Path("/login")
	@Produces(MediaType.APPLICATION_JSON)
	public String loginCheck(@QueryParam("username") String Username, @QueryParam("password") String password) {
	    
		ArrayList<ContentBean> lContentBeans;
		if(isValidUser(Username,password))
		{
		
		ContentBean oContentBean = buildResult(Username, ""); // hard coded username and path
     	lContentBeans = new ArrayList<ContentBean>();
    	lContentBeans.add(oContentBean);
		}
		else 
		{
    
	//*//	
		ContentBean oContentBean = buildResult("-", ""); // empty username and path
     	lContentBeans = new ArrayList<ContentBean>();
    	lContentBeans.add(oContentBean);
   //*/ 	
		}
		
		
		String jsonString = serializeListToJSON(lContentBeans);
		
		return jsonString;
	}
	
	/**
     * Method for parsing REST request
     *
      * @param Username
     * @param Path
     *
      * @return The list of ContentBeans to set in the response
     */
     @POST
     @XmlElement(name = "query")
     @Path("/query")
     @Produces(MediaType.APPLICATION_JSON)
     @Consumes(MediaType.APPLICATION_JSON)
     public String query(Query query) {
        
           //System.out.print("the query ::\n" +query.getStatement() + ":::\n\n");
    	 String jsonString="";
    	 
         jsonString = getQueryResults(query.getStatement());
         /*
    	 try {
                  jsonString = getLFQueryResults(query.getStatement());
          } catch (Throwable e) {
                  // TODO Auto-generated catch block
                  e.printStackTrace();
          }
          //*/ 
            //System.out.print("the query result ::\n" + Q);
            return jsonString;
     }
	
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
	@Path("/retrieve")
	@Produces(MediaType.APPLICATION_JSON)
	public String retrieve(@QueryParam("username") String Username, @QueryParam("path") String Path) {
	    
		//Username = "http://" + Username + ".ldm.io/" ;
		Username = "http://localhost:8080/LDM/server/" + Username + "/" ;
		ArrayList<ContentBean> lContentBeans = getAnswers(Username, Path);
    
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
                if(x.toString().endsWith("/"))
                {
                    aB.setType(false);
                    aB.setSize(-1);
                }
                else
                    {
                    aB.setType(true);
                    ResultSet rdfResults = qManager.getAllTriples(x.toString());
                    String rdfFile = getRDFFile(x.toString(), rdfResults);
                    aB.setSize(rdfFile.length());
                    }
                
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
            String rdfFile = getRDFFile(sPath, results);
            // Fill AttributeBean
            AttributesBean aB = new AttributesBean();
            aB.setType(true);
            // ACLBean Empty
            ACLBean aclB = new ACLBean();
            
            RDFBean rdfB = new RDFBean();
            //rdfB.setText(StringUtils.newStringUtf8(Base64.encodeBase64(rdfFile.getBytes())));
            rdfB.setText(rdfFile);
            System.out.println("RDF File set to bean: " + rdfB.getText());
            
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

    private static String getRDFFile(String file, ResultSet results){
        String rdfFile = "";
        while(results.hasNext()){                
            rdfFile += "<" + file + "> ";
            QuerySolution soln = results.nextSolution();
            RDFNode x = soln.get("p");
            rdfFile += "<" + x.toString() + "> ";
            x = soln.get("o");
            if(x.isResource()){
                rdfFile += "<" + x.toString() + ">.\n";
            }
            if(x.isLiteral()){
                String temp = x.toString();
                System.out.println(temp);
                if(temp.contains("^^")){
                    rdfFile += "\"" + temp.substring(0, temp.indexOf("^^")-1) + "\"" + "^^<" + temp.substring(temp.indexOf("^^")+2, temp.length()) + ">.\n";
                }
                else
                    rdfFile += "\"" + x.toString() + "\".\n";
            }
        }
        return rdfFile;
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
		
		/*/
		if("".equals(sPath)){
			aB.setName("profile/");
		}else{
			aB.setName("profile/card/"); //From request
		}
		
		aB.setType(false);  //Hard coded for testing purposes
		aB.setSize(0.2);   //Hard coded for testing purposes
		aB.setLastModified(new Date());
		//*/
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
	
	public void deleteURI(String uriToDelete){
		UpdateRequest request = UpdateFactory.create();
		request.add("DELETE {<" + uriToDelete + "> ?p ?o} WHERE {SELECT ?p ?o WHERE{<" + uriToDelete + "> ?p ?o}}");
		request.add("DELETE {?s ?p <" + uriToDelete + ">} WHERE {SELECT ?s ?p ?o WHERE{?s ?p <" + uriToDelete + ">}}");
		UpdateProcessor processor = UpdateExecutionFactory.createRemote(request, "http://localhost:3030/ds/update");
		processor.execute();
	}
	
	
public void insertURI(String URI, String Content){
		
		UpdateRequest request = UpdateFactory.create();
		
		//System.out.print("INSERT DATA {" + Content + "}");
		request.add("INSERT DATA {" + Content + "}");
		//System.out.print("INSERT DATA {<" + URI.substring(0, URI.lastIndexOf("/")+1)+ "> <http://www.w3.org/ns/ldp#contains> <" + URI + ">}");
		request.add("INSERT DATA {<" + URI.substring(0, URI.lastIndexOf("/")+1)+ "> <http://www.w3.org/ns/ldp#contains> <" + URI + ">}");
		UpdateProcessor processor = UpdateExecutionFactory.createRemote(request, "http://localhost:3030/ds/update");
		processor.execute();
	}
	
	public void updateURI(String URI, String Content){
		
		UpdateRequest request = UpdateFactory.create();
		
		request.add("DELETE {<" + URI + "> ?p ?o} WHERE {SELECT ?p ?o WHERE{<" + URI + "> ?p ?o}}");
		request.add("DELETE {?s ?p <" + URI + ">} WHERE {SELECT ?s ?p ?o WHERE{?s ?p <" + URI + ">}}");
		
		//System.out.print("INSERT DATA {" + Content + "}");
		request.add("INSERT DATA {" + Content + "}");
		//System.out.print("INSERT DATA {<" + URI.substring(0, URI.lastIndexOf("/")+1)+ "> <http://www.w3.org/ns/ldp#contains> <" + URI + ">}");
		request.add("INSERT DATA {<" + URI.substring(0, URI.lastIndexOf("/")+1)+ "> <http://www.w3.org/ns/ldp#contains> <" + URI + ">}");
		UpdateProcessor processor = UpdateExecutionFactory.createRemote(request, "http://localhost:3030/ds/update");
		processor.execute();
	}
	
	private boolean isValidUser(String username, String password)
	{
		boolean valid = false;
		if ( (username.equals("essam")&& password.equals("essam")) ||
			 (username.equals("ahmed")&& password.equals("ahmed")) ||
			 (username.equals("maged")&& password.equals("maged"))
			)
			valid = true;
		
		return valid;
	}
	
	public String getQueryResults(String query){
		QueryManager qManager = new QueryManager();
		ResultSet results = qManager.executeQuery(query);
		ResultsWrapper wrapper = new ResultsWrapper(results);
		return wrapper.getResultsAsJSON();
	}
	
	public String getLFQueryResults(String q) throws Exception {
		
		String LFResult = "";
		
		/*
		q = "Select ?Owner ?Content ?Time Where{" ;
		q = q+ " <http://localhost:8080/LDM/server/essam/> <http://www.w3.org/ns/pim/space#storage> ?Storage.";
		q = q+ " ?Storage <http://www.w3.org/ns/ldp#contains> ?MBlog.";
		q = q+ " ?MBlog a <http://crosscloud/mblog/ChannelSpace>.";
		q = q+ " ?MBlog <http://www.w3.org/ns/ldp#contains> ?SSList.";
		q = q+ " ?SSList a <http://crosscloud/mblog/SubscriptionList>.";
		q = q+ " ?SSList <http://www.w3.org/ns/ldp#contains> ?Subscription.";
		q = q+ " ?Subscription a <http://crosscloud/mblog/Subscription>.";
		q = q+ " ?Subscription <http://crosscloud/mblog/link> ?Channel.";
		q = q+ " ?Channel <http://www.w3.org/ns/ldp#contains> ?Post. ";
		q = q+ " ?Post a <http://crosscloud/mblog/Post>.";
		q = q+ " ?Post <http://crosscloud/mblog/owner> ?Owner.";
		q = q+ " ?Post <http://rdfs.org/sioc/ns#content> ?Content.";
		q = q+ " ?Post <http://purl.org/dc/terms/created> ?Time. }";
		 //*/ 
		
		System.out.print("the LF Q is ::\n" + q +"\n:::\n");
		
		Config.initialize();
		
		System.out.print("Config.initialize() ::\n");
		
		SailRepository repo = FedXFactory.initializeSparqlFederation(Arrays.asList(
				"http://localhost:3031/ds/query",
				"http://localhost:3032/ds/query",
				"http://localhost:3033/ds/query"));
		
		System.out.print("initializeSparqlFederation ::\n");
		
		TupleQuery query = repo.getConnection().prepareTupleQuery(QueryLanguage.SPARQL, q);
		TupleQueryResult results = query.evaluate();
		
		
		while (results.hasNext()) {
			//System.out.println(results.next());
			LFResult = LFResult + results.next() +"\n";
		}
		
		System.out.print("******* Link Following Result **********\n"+LFResult);
		
		FederationManager.getInstance().shutDown();
		System.out.println("******* Done.**********\n");
		
		toJSON(LFResult) ;
		return LFResult;
		
				
	}
	
	
	private String toJSON (String input){
		String output= "";
		String Oheader1  = "{ \n \"head\":\n { \"vars\":";
		String Oheader2  = " } ,";
		String Oresults1 = "\"results\": \n{ \"bindings\": [\n";
		String Oresults2 = "]\n }\n }\n";
		String tuple	 = "";
		
		return output;
	}
	
	
	

}
