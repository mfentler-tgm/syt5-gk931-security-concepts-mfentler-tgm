# Overview
Hier werden verschiedene Security concept Methoden untersucht und beschrieben.  
Dabei wird auf folgende Punkte genauer eingegangen:

- Vor-/Nachteile
- Anbindung an bestehende Authentifikations-Services
- Token-Authentifizierung, um ein andauerndes Login bei mehreren Services gering zu halten bzw. auf ein einmaliges Authentifizieren zu beschränken
- Verwendung auf verschiedenen Implementierungen und Devices
- Mögliche Einsatzgebiete

## Single Sign On (SSO)
Der Benutzer muss sich nur einmal anmelden, um dann auf alle Dienste (lokal auf seinem Rechner) zugreifen zu können, ohne sich immer wieder für alles neu anzumelden.  
Eine weitere Anforderung an das SSO ist es, dass es nicht schwächer als das normale Authentifizierungsverfahren ist.

### Vor-/Nachteile
(-) Damit Benutzer nicht bei bei kurzen Handlungspausen wieder abgemeldet werden, erhält diese Authentifizierung einen großzügigen Zeitschranken. Dieser zieht aber zur Folge, dass unbefugten Personen der Zugriff zu diesem Arbeitsplatz bei einer kurzen Abwesenheit der Person ermöglicht wird.  
(-) Der Dienst ist nur verfügbar, wenn das Single-Sign-On-System auch verfügbar ist.  
(-) Wenn kein Sign-Off implementiert ist, dann bleibt man bis zum Timeout angemeldet.  

(+) Man muss sich nur noch 1x anmelden.  
(+) Sicherheit -> Benutzer muss sich nur ein Passwort merken und es wird nur einmal übertragen.  
(+) Phishing-Attacken werden erschwert -> Nur noch eine Eingabe auf einer Webseite, etc.

### Token-Authentifizierung
Portallösung:  
Mit Hilfe von Cookies wird gespeichert, dass der User angemeldet ist.  

Ticketing System:  
Gemeinsame Identitfikation für einen Benutzer zwischen Diensten über ein virtuelles Ticket.  

Lokale Lösung:  
Lokale Anwendungen können die Anmeldeinformationen automatisch einfügen. (Avast macht das beispielsweise)  

### Einsatzgebiete
Webseiten  

## Ticket Granting Ticket Service (TGT)
Das TGT ist eine kleine Date, die einem den Zugang zum Datenaustausch erlaubt.  
TGT wird bei Kerberos verwendet.

(+) Gilt als sicher, weil es die IP-Addresse des Benutzers, die Gültigkeitsdauer des TGT und ienen Session Key enthält.

### Einsatzgebiete
Kerberos

## Central Authentication Service (CAS)
CAS ist im grunde genommen eine Web-Anwendung auf einem CAS Server, die die Anmeldung und Authentifizierung übernimmt. Dazu braucht man 3 URLs, mit denen das Anmelde- und Authentifizierungsverfahren durch eine HTTPS-Verbindung zum Server abgewickelt wird.  
- Login-URL:
Über eine Service-URL des Webservices gelangt man zur Login-URL.  
Hier werden Username und Passwort abgefragt und geprüft. Sofern die Anmeldung erfolgreich war wird man zur Service-URL mit einem Ticketparameter zurück geleitet. 
- Validation-URL:
Es wird überprüft ob das Ticket in der DB vorhanden ist. Wenn das der Fall ist, dann wird dem Benutzer der Zugriff gewährt.
- Logout-URL:
Anhand eines TGT-Cookies wird überprüft ob der Benutzer angemeldet ist und dann auf alles besuchten CAS Client Web Services abgemeldet.  

### Einsatzgebiete
Das CAS Protokoll ist ein offenes Protokoll, zu dem die CAS Server Implementierungen bekannt sind:  
RubyCAS  
CASino

Ein Einsatzgebiet könnte beispielsweise sein, um Bildunsinstitute zu vernetzen und einen freien Wissensaustausch zu ermöglichen.  

## Open Authorization 2.0 (OAuth)
Ist eine Api-Applikation für Desktop-/Web-/Mobileanwendungen.  
Das OAuth 2.0-Autorisierungsframework ermöglicht Drittanbieter Anwendung, um begrenzten Zugriff auf einen HTTP-Dienst zu erhalten, entweder auf im Namen eines Ressourcenbesitzers durch Orchestrieren einer Genehmigungsinteraktion zwischen dem Ressourcenbesitzer und dem HTTP-Dienst oder Anwendung von Drittanbietern, um Zugriff in eigenem Namen zu erhalten.

Mit Hilfe von OAuth kann ein User einer Drittanwendung erlauben, auf seine Daten zuzugreifen, die bei einem anderen Dienst gespeichert sind ohne dabei dem Drittanbieter dabei die Zugangsdaten preiszugeben.  

OAuth2 ist von der Struktur ähnlich zu SAML. Es verwendet auch einen Server, der Berechtigungen in Form von Token ausstellt. Dieser heißt hier "Authorization Server".  
Der wesentliche Unterschied zu SAML besteht darin, dass OAuth2:  
- Nachrichten auch über URL-Parameter versenden kann  
- Der OAuth2 Token enthält standardmäßig keine Credentials vom Benutzer

### Vor-/Nachteile
(+) Keine Credentials vom Benutzer im Token
(+) Crededentials sind ausschließlich beim Authorization Server und nicht an einer dritten Stelle hinterlegt  
(+) Sollte der Token abgefangen werden, dann hat der Angreifer keine Zugangsdaten vom Benutzer

### Einsatzgebiete
Dienste von Google, Facebook, Twitter etc. benutzen OAuth2.

## Security Assertion Markup Language (SAML)
SAML verwendet einen Service, genannt "Identity Provider Server", welcher sämtliche Passwörter und User-Identitäten enthält. Dieser Server stellt Token aus, wenn die geschickten Zugangsdaten mit den Daten, die für den User gespeichert sind, übereinstimmen. Der Server leitet diesen Token dann an das System weiter, das der User eigentlich besuchen wollte.  
Dieses überprüft dann den Token nochmals ob er von dem Identity Provider Server stammt.  

In Webanwendungen werden häufig Cookies oder Sessions genutzt um den User dann angemeldet zu halten. Solange der User den Cookie oder die Session besitzt muss kein neuer SAML-Token angefragt werden.

### Vorteile/Nachteile
(-) Im Token ist auch das Passwort des Users enthalten. Schafft es ein Angreifer den Token abzufangen, so hat er die Anmeldedaten des Users.  
(-) Sendet längere Nachrichten über HTTP-POST

### Aufbau
_SAML Assertion_

      <saml:Assertion ...>
        ...
      </saml:Assertion>
Die Assertions sind Aussagen, die von einem Service-Provider genutzt werden um über das Zulassen eines Zugriffs zu entscheiden.  
Es gibt 3 Arten von Statements:
- Authentication statement  
Authentifizierung für Subjekt S zur Zeit t mittels M (Single Sign-On)
- Attribute statement  
Subjekt S verfügt über Attribut A mit dem Wert a (verteilte Transaktionen)
- Authorization decision statement  
Autorisierung bestimmter Ressourcen

### Einsatzgebiete
- Webanwendungen
- Webservices

## Kerberos
Kerberos ist ein Authentifizierungsprotokoll. Es ünterstützt SSO.  
Genauggenommen besteht es aus 3 Diensten:

- AS Exchange, ein Authentication Service, der die Authentifizierung übernimmt
- TGS Exchange, stellt die TGT Tickets für den Zugriff auf die Dienste aus.
- Client/Server Exchange, ist die Komponente über die ein Service Ticket verarbeitet wird.

## Quellen
[ttps://de.wikipedia.org/wiki/Single_Sign-on](https://de.wikipedia.org/wiki/Single_Sign-on)  
[https://de.wikipedia.org/wiki/Ticket_Granting_Ticket](https://de.wikipedia.org/wiki/Ticket_Granting_Ticket)  
[https://de.wikipedia.org/wiki/Central_Authentication_Service](https://de.wikipedia.org/wiki/Central_Authentication_Service)  
[https://de.wikipedia.org/wiki/OAuth](https://de.wikipedia.org/wiki/OAuth)  
[https://oauth.net/2/](https://oauth.net/2/)  
[https://de.wikipedia.org/wiki/Security_Assertion_Markup_Language](https://de.wikipedia.org/wiki/Security_Assertion_Markup_Language)  
[https://www.security-insider.de/was-ist-oauth-a-712468/](https://www.security-insider.de/was-ist-oauth-a-712468/)  
[https://de.wikipedia.org/wiki/Kerberos_(Informatik)](https://de.wikipedia.org/wiki/Kerberos_(Informatik))  
[http://www.kerberos.org/docs/index.html](http://www.kerberos.org/docs/index.html)  
[https://dafrk-blog.com/de/sso-kerberos-saml-oauth-sap/](https://dafrk-blog.com/de/sso-kerberos-saml-oauth-sap/)  
[https://www.getkisi.com/blog/authentication-protocols-overview](https://www.getkisi.com/blog/authentication-protocols-overview)  



