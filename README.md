# JSServerExperiments
Theory to practical

# Content Length & Transfer Encoding

When an HTTP client is reading a response message from a server it needs to know when it has reached the end of the message.
This is particularly important with persistent (keep alive) connections,
because a connection can only be re-used by another HTTP transaction after the response message has been fully received.
The following sections describe the four ways in which an HTTP server can indicate the end of the response message:

# 1. Connection Closed by Server

The connection can be closed at the end of the response message by the server, but this prevents connections being re-used.

# 2. Content-Length Header

The length of the content after the response headers can be specified in bytes with the Content-Length header

# 3. Implied Content Length

Some types of responses, such as 304, are defined to never have content and
therefore the client can assume that the response message is terminated by the double CRLF after the headers.

# 4. Chunked Encoding

The content can be broken up into a number of chunks; each of which is prefixed by its size in bytes.
A zero size chunk indicates the end of the response message.
If a server is using chunked encoding it must set the Transfer-Encoding header to "chunked".

Chunked encoding is useful when a large amount of data is being returned to the client and
the total size of the response may not be known until the request has been fully processed.

 An example of this is generating an HTML table of results from a database query.
 If you wanted to use the Content-Length header you would have to buffer the whole result set before calculating the total content size.
 However, with chunked encoding you could just write the data one row at a time and write a zero sized chunk
 when the end of the query was reached.
