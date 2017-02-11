package nl.isaac.dbh17.datastore.rest;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response.Status;

import nl.isaac.dbh17.datastore.UnknownSubsnapIdException;
import nl.isaac.dbh17.datastore.database.entity.Subsnap;
import nl.isaac.dbh17.datastore.facade.SubsnapFacade;
import nl.isaac.dbh17.datastore.rest.dto.RetrieveSubsnapResponse;
import nl.isaac.dbh17.datastore.rest.dto.StoreSubsnapRequest;
import nl.isaac.dbh17.datastore.rest.dto.StoreSubsnapResponse;

@Path("subsnap")
@Produces(MediaType.APPLICATION_JSON)
public class SubsnapBD {

	@Inject private SubsnapFacade subsnapFacade;
	
	@POST @Path("/")
	public StoreSubsnapResponse storeSubsnap(StoreSubsnapRequest storeRequest) {
		String newSubsnapID = subsnapFacade.storeSubsnap(storeRequest.getData());
		
		return new StoreSubsnapResponse(newSubsnapID);
	}
	
	@GET @Path("/{subsnapID}")
	public RetrieveSubsnapResponse retrieveSubsnap(@PathParam("subsnapID") String subsnapID) {
		
		Subsnap subsnap;
		try {
			 subsnap = subsnapFacade.retrieveSubsnap(subsnapID);
		} catch (UnknownSubsnapIdException e) {
			throw new WebApplicationException(Status.NOT_FOUND);
		}
		
		return new RetrieveSubsnapResponse(subsnap);
	}
}
