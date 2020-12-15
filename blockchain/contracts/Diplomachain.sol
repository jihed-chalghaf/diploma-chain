// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

contract Diplomachain {
    struct Diploma {
        address id;
        address owner;
        string speciality;
        string honors;
        string title;
        uint256 dateObtained; // timestamps format
    }

    struct Student {
        address id;
        string firstName;
        string lastName;
        string email;
        string nationality;
        string phoneNumber;
        string gender;
        Diploma[] diplomas;
    }

    mapping(address => uint256) private studentsIndexes;
    Student[] public students;
    uint256 public studentsCount;

    // we can know if a diploma exists or not
    mapping(address => uint256) public diplomasIndexes;
    Diploma[] public diplomas;
    uint256 public diplomasCount;

    // Let's say we have multiple universities, so it's a good practice to define admins addresses for nwo
    mapping(address => uint256) public adminsIndexes;

    constructor() {
        studentsCount = 0;
        diplomasCount = 0;
    }

    // modifiers declaration
    modifier onlyAdmin() {
        require(adminsIndexes[msg.sender] != 0, "Admin not found");
        _;
    }
    modifier onlyStudent() {
        require(studentsIndexes[msg.sender] != 0, "Student not found");
        _;
    }
    modifier validDiploma() {
        // converting msg.sender to address type
        address diploma_adr = msg.sender;
        require (diplomasIndexes[diploma_adr] != 0, "You provided an invalid diploma identifier");
        _;
    }

    // events definition
    event LogRequestDiploma(address studentId);
    event LogAddDiploma(address diplomaId);

    // Functiosn definition
    function verifyDiploma(address diplomaId) public view validDiploma returns (Diploma memory){
        return diplomas[diplomasIndexes[diplomaId]];
    }

    // addStudent()
    // addDiploma()
    // isStudent()
    // isAdmin()
    // getStudentIndex()
    // getDiplomaIndex()
    // getStudents()
    // getDiplomas()
}