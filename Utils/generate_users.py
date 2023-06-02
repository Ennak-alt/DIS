from faker import Faker
import hashlib, random, string, sys

NUM_USERS = 10000
DEFAULT_PASSWORD = "test123"

SALT_LENGTH = 32

fake = Faker()

def random_salt(length = 32):
    letters = string.ascii_letters + string.digits
    salt = ""
    for i in range(length):
        salt += random.choice(letters)

    return salt

def random_phone():
    letters = string.digits
    phone = ""
    for i in range(random.randrange(8, 15)):
        phone += random.choice(letters)

    return phone

usersfile = open("./users.csv", "w")
ratingsfile = open("./ratings.csv", "w")
carsfilelines = sum(1 for _ in open("./oldcars.csv", "r"))
rateeId = 0
uid = int(sys.maxsize / 4)

sellers = []

for i in range(NUM_USERS):
    # User ID
    uid += random.randrange(1, int(sys.maxsize / 4 / NUM_USERS))
    usersfile.write("%d;" % uid)

    # Password
    salt = random_salt(SALT_LENGTH)
    password = DEFAULT_PASSWORD

    sha256 = hashlib.sha256()
    sha256.update(password.encode('utf-8'))
    sha256.update(salt.encode('utf-8'))
    usersfile.write(salt + ";")
    usersfile.write(sha256.hexdigest() + ";")

    # Contact info
    usersfile.write(fake.first_name() + ";")
    usersfile.write(fake.last_name() + ";")
    usersfile.write(fake.email() + ";")
    usersfile.write(random_phone() + "\n")

    # Ratings
    if rateeId != 0 and random.randrange(5) < 3:
            min_rating = int(str(rateeId)[-1]) % 4
            max_rating = int(str(rateeId)[-1]) % 3 + 4
            ratingsfile.write("%d;%d;%d\n" % (uid, rateeId, random.randrange(min_rating, max_rating)))

    if random.randrange(10) == 0:
        rateeId = uid
        while len(sellers) < carsfilelines and random.randrange(3) < 2:
            sellers.append(uid)

newcarsfile = open("./cars.csv", "w")
for line in open("./oldcars.csv", "r"):
    newcarsfile.write(line[:-1])
    newcarsfile.write(";%d\n" % sellers[random.randrange(len(sellers))])
