package services
	
import (
    "time"
	"fmt"
	"github.com/google/uuid"
)

type UESession struct {
	UID      int64
	Expires  int64
}
type TESession struct {
	Token      string  `json:"token"`
	ExpiresIn  int     `json:"expiresin"`
}

var sessionMap map[string]UESession = make(map[string]UESession);

func MakeSession(uid int64) TESession {
	var token = fmt.Sprintf("%x", uuid.New())
	var expiresIn = 43200 // 12 hours
	var newSession = UESession{
		UID: uid,
		Expires: time.Now().Unix() + int64(expiresIn),
	};

	sessionMap[token] = newSession;

	return TESession{
		Token: token,
		ExpiresIn: expiresIn,
	};
}

func DestroySession(token string) {
	delete(sessionMap, token);
}

func DestroyAllUserSessions(uid int64) {
	var newMap = make(map[string]UESession)
	for key, element := range sessionMap {
        if element.UID != uid {
			newMap[key] = element;
		}
    }
	sessionMap = newMap;
}

func CheckSession(token string) int64 {
	session, exists := sessionMap[token]
	if exists {
		if session.Expires <= time.Now().Unix() {
			delete(sessionMap, token)
		} else {
			return session.UID
		}
	}

	// TODO: Error?
	return -1;
}

func CleanSessions() {
	var now = time.Now().Unix()
	var newMap = make(map[string]UESession)
	for key, element := range sessionMap {
        if element.Expires > now {
			newMap[key] = element;
		}
    }
	sessionMap = newMap;
}
