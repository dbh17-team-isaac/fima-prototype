package nl.isaac.dbh17.datastore.rest;

import java.util.Base64;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response.Status;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import nl.isaac.dbh17.datastore.UnknownSubsnapIdException;
import nl.isaac.dbh17.datastore.database.entity.Subsnap;
import nl.isaac.dbh17.datastore.facade.SubsnapFacade;
import nl.isaac.dbh17.datastore.rest.dto.RetrieveSubsnapResponse;
import nl.isaac.dbh17.datastore.rest.dto.StoreSubsnapRequest;
import nl.isaac.dbh17.datastore.rest.dto.StoreSubsnapResponse;

@Path("subsnap")
@Produces(MediaType.APPLICATION_JSON)
public class SubsnapBD {
	Logger logger = LoggerFactory.getLogger(SubsnapBD.class);
	
	@Inject private SubsnapFacade subsnapFacade;
	
	@POST @Path("/")
	public StoreSubsnapResponse storeSubsnap(StoreSubsnapRequest storeRequest) {
		
		byte[] data;
		try {
			data = Base64.getDecoder().decode(storeRequest.getData());
		} catch (IllegalArgumentException e) {
			logger.error("Invalid Base64 data for new subsnap");
			throw new WebApplicationException(Status.BAD_REQUEST);
		}
		
		String newSubsnapID = subsnapFacade.storeSubsnap(data);
		
		return new StoreSubsnapResponse(newSubsnapID);
	}
	
	@GET @Path("/{subsnapID}")
	public RetrieveSubsnapResponse retrieveSubsnap(@PathParam("subsnapID") String subsnapID) {
		
		Subsnap subsnap;
		try {
			 subsnap = subsnapFacade.retrieveSubsnap(subsnapID);
		} catch (UnknownSubsnapIdException e) {
			logger.warn("Subsnap with ID '" + subsnapID + "' not found");
			throw new WebApplicationException(Status.NOT_FOUND);
		}
		
		String base64Data = Base64.getEncoder().encodeToString(subsnap.getData());
		
		RetrieveSubsnapResponse response = new RetrieveSubsnapResponse();
		response.setSubsnapID(subsnap.getSubsnapID());
		response.setData(base64Data);
		
		return response;
	}
}
