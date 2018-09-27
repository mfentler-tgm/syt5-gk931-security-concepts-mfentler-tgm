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

## Central Authentication Service (CAS)

## Open Authorization (OAuth)

## Security Assertion Markup Language (SAML)

## Kerberos

## Quellen
https://de.wikipedia.org/wiki/Single_Sign-on  
https://de.wikipedia.org/wiki/Ticket_Granting_Ticket
