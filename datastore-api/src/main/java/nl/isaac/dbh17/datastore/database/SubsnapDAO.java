package nl.isaac.dbh17.datastore.database;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;

import nl.isaac.dbh17.datastore.database.entity.Subsnap;

@Stateless
public class SubsnapDAO {
	//private static final Logger logger = LoggerFactory.getLogger(SubsnapDAO.class.getName());

	@Inject private EntityManager em;
	
	public Subsnap storeSubsnap(String data) {
		Subsnap subsnap = new Subsnap(data);
		em.persist(subsnap);
		return subsnap;
	}
	
	public Subsnap getSubsnap(String subsnapID) {
		TypedQuery<Subsnap> query = em.createQuery("select s from Subsnap s where subsnapID = :subsnapID", Subsnap.class);
		
		query.setParameter("subsnapID", subsnapID);
		
		try {
			return query.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}
}
