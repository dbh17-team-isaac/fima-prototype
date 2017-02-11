package nl.isaac.dbh17.datastore.database;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import nl.isaac.dbh17.datastore.database.entity.Subsnap;

@Stateless
public class SubsnapDAO {
	private static final Logger logger = LoggerFactory.getLogger(SubsnapDAO.class);

	@Inject private EntityManager em;
	
	public Subsnap storeSubsnap(byte[] data) {
		Subsnap subsnap = new Subsnap(data);
		em.persist(subsnap);
		
		logger.info("Stored new subsnap with ID " + subsnap.getSubsnapID());
		return subsnap;
	}
	
	public Subsnap getSubsnap(String subsnapID) {
		logger.info("Retrieve subsnap with ID " + subsnapID);
		
		TypedQuery<Subsnap> query = em.createQuery("select s from Subsnap s where subsnapID = :subsnapID", Subsnap.class);
		
		query.setParameter("subsnapID", subsnapID);
		
		try {
			return query.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}
}
