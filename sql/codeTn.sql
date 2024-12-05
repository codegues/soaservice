-- Usr Table (Users)
CREATE TABLE Usr (
    Email VARCHAR(255) PRIMARY KEY,
    Phone VARCHAR(20),
    FirstName VARCHAR(100),
    LastName VARCHAR(100),
    DateofBirth DATE,
    Address TEXT,
    Password VARCHAR(255)
);

-- Serie Table (Series)
CREATE TABLE Serie (
    Title VARCHAR(255) PRIMARY KEY,
    Descript TEXT
);

-- Question Table (Questions)
CREATE TABLE Question (
    Enonce VARCHAR(255) PRIMARY KEY,
    Reponse TEXT,
    Answer INT
);

-- Usr_Serie Table (Many-to-Many Relationship between Users and Series)
CREATE TABLE Usr_Serie (
    UsrId VARCHAR(255),
    SerieId VARCHAR(255),
    PRIMARY KEY (UsrId, SerieId),
    FOREIGN KEY (UsrId) REFERENCES Usr(Email) ON DELETE CASCADE,
    FOREIGN KEY (SerieId) REFERENCES Serie(Title) ON DELETE CASCADE
);

-- Question_Serie Table (Many-to-Many Relationship between Questions and Series)
CREATE TABLE Question_Serie (
    QuestionId VARCHAR(255),
    SerieId VARCHAR(255),
    PRIMARY KEY (QuestionId, SerieId),
    FOREIGN KEY (QuestionId) REFERENCES Question(Enonce) ON DELETE CASCADE,
    FOREIGN KEY (SerieId) REFERENCES Serie(Title) ON DELETE CASCADE
);