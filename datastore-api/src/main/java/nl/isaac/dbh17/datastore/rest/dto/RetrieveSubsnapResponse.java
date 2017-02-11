package nl.isaac.dbh17.datastore.rest.dto;

public class RetrieveSubsnapResponse {

	private String subsnapID;
	private String data;
	
	public RetrieveSubsnapResponse() {}
	
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
