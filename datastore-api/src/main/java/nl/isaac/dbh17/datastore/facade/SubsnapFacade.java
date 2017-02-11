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
	public String storeSubsnap(byte[] data) {
		Subsnap subsnap = dao.storeSubsnap(data);
		
		return subsnap.getSubsnapID();
	}
	
	/**
	 * Retrieves a subsnap based on it's Subsnap ID
	 * 
	 * @param subsnapID The Subsnap ID
	 * @return The Subsnap
	 * 
	 * @throws UnknownSubsnapIdException If no Subsnap can be found based on the given Subsnap ID
	 */
	public Subsnap retrieveSubsnap(String subsnapID) throws UnknownSubsnapIdException {
		Subsnap subsnap = dao.getSubsnap(subsnapID);
		
		if (subsnap != null) {
			return subsnap;
		} else {
			throw new UnknownSubsnapIdException();
		}
		
	}

}
