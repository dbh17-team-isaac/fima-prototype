package nl.isaac.dbh17.datastore.database;

import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class EntityManagerProducer {

	@PersistenceContext(unitName="fima-datastore-pu")
	private EntityManager rollerbankEntityManager;

	@Produces
	public EntityManager getRollerbankEntityManager() {
		return rollerbankEntityManager;
	}
}
