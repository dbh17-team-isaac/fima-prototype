package nl.isaac.dbh17.datastore.database.entity;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Subsnap {

	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	private String subsnapID;
	private String data;
	
	public Subsnap() {}
	
	public Subsnap(String data) {
		this.data = data;
		this.subsnapID = UUID.randomUUID().toString();
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getSubsnapID() {
		return subsnapID;
	}
	public void setSubsnapID(String subsnapID) {
		this.subsnapID = subsnapID;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
}
