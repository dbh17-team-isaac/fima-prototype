package nl.isaac.dbh17.datastore.database.entity;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class Subsnap {

	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	private String subsnapID;
	
	@Lob
	private byte[] data;
	
	public Subsnap() {}
	
	public Subsnap(byte[] data) {
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
	public byte[] getData() {
		return data;
	}
	public void setData(byte[] data) {
		this.data = data;
	}
}
