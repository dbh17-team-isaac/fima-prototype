package nl.isaac.dbh17.datastore.rest.dto;

import nl.isaac.dbh17.datastore.database.entity.Subsnap;

public class RetrieveSubsnapResponse {

	private String subsnapID;
	private String data;
	
	public RetrieveSubsnapResponse() {}
	
	public RetrieveSubsnapResponse(Subsnap subsnap) {
		this.subsnapID = subsnap.getSubsnapID();
		this.data = subsnap.getData();
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
