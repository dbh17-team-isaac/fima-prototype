package nl.isaac.dbh17.datastore.rest.util;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.lang.annotation.Annotation;
import java.lang.reflect.Type;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.ext.MessageBodyReader;
import javax.ws.rs.ext.MessageBodyWriter;
import javax.ws.rs.ext.Provider;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@Provider
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class GsonProvider implements MessageBodyWriter<Object>, MessageBodyReader<Object> {
	private static final Logger logger = LoggerFactory.getLogger(GsonProvider.class);

	private static final String UTF_8 = "UTF-8";

	private Gson gson;

	//Customize the gson behavior here
	private Gson getGson() {
		if (gson == null) {
		    final GsonBuilder gsonBuilder = new GsonBuilder();
		    gson = gsonBuilder.disableHtmlEscaping()
		            .setPrettyPrinting()
		            .serializeNulls()
		            .create();
		}
		return gson;
	}

	@Override
	public boolean isReadable(Class<?> type, Type genericType, java.lang.annotation.Annotation[] annotations, MediaType mediaType) {
		return true;
	}

	@Override
	public Object readFrom(Class<Object> type, Type genericType,
		    Annotation[] annotations, MediaType mediaType,
		    MultivaluedMap<String, String> httpHeaders, InputStream entityStream) {

		try (InputStreamReader streamReader = new InputStreamReader(entityStream, UTF_8)){
			Type jsonType;
			if (type.equals(genericType)) {
				jsonType = type;
			} else {
				jsonType = genericType;
			}
			return getGson().fromJson(streamReader, jsonType);

		} catch (UnsupportedEncodingException e) {
		    logger.error("Error while reading entity stream", e);
		    throw new RuntimeException(e);
		} catch (IOException e) {
			logger.error("Error while reading entity stream", e);
		    throw new RuntimeException(e);
		}
	}

	@Override
	public boolean isWriteable(Class<?> type, Type genericType, Annotation[] annotations, MediaType mediaType) {
		return true;
	}

	@Override
	public long getSize(Object object, Class<?> type, Type genericType, Annotation[] annotations, MediaType mediaType) {
		return -1;
	}

	@Override
	public void writeTo(Object object, Class<?> type, Type genericType,
		    Annotation[] annotations, MediaType mediaType,
		    MultivaluedMap<String, Object> httpHeaders,
		    OutputStream entityStream) throws IOException,
		    WebApplicationException {

		OutputStreamWriter writer = new OutputStreamWriter(entityStream, UTF_8);
		try {
		    Type jsonType;
		    if (type.equals(genericType)) {
		        jsonType = type;
		    } else {
		        jsonType = genericType;
		    }
		    getGson().toJson(object, jsonType, writer);
		} finally {
		    writer.close();
		}
	}
}