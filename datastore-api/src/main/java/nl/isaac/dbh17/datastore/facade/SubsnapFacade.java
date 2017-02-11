package nl.isaac.dbh17.datastore.facade;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nl.isaac.dbh17.datastore.UnknownSubsnapIdException;
import nl.isaac.dbh17.datastore.database.SubsnapDAO;
import nl.isaac.dbh17.datastore.database.entity.Subsnap;

@Stateless
public class SubsnapFacade {

	@Inject SubsnapDAO dao;
	
	/**
	 * Stores a blob of encrypted data into the datastore
	 * 
	 * @param data The encrypted blob
	 * @return The ID of the subsnap in the datastore
	 */
	public String storeSubsnap(String data) {
		// FIXME validation
		Subsnap subsnap = dao.storeSubsnap(data);
		
		return subsnap.getSubsnapID();
	}
	
	public Subsnap retrieveSubsnap(String subsnapID) throws UnknownSubsnapIdException {
		Subsnap subsnap = dao.getSubsnap(subsnapID);
		
		if (subsnap != null) {
			return subsnap;
		} else {
			throw new UnknownSubsnapIdException();
		}
		
	}

}
