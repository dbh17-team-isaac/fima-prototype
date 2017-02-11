package nl.isaac.dbh17.datastore.rest.dto;

public class StoreSubsnapResponse {
	
	private String subsnapID;
	
	public StoreSubsnapResponse() {}
	
	public StoreSubsnapResponse(String subsnapID) {
		this.subsnapID = subsnapID;
	}

	public String getSubsnapID() {
		return subsnapID;
	}

	public void setSubsnapID(String subsnapID) {
		this.subsnapID = subsnapID;
	}
}
