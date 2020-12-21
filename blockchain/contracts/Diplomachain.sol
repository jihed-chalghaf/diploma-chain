// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

contract Diplomachain {
    struct Diploma {
        bytes32 id;
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
    mapping(bytes32 => uint256) public diplomasIndexes;
    Diploma[] public diplomas;
    uint256 public diplomasCount;
    mapping(bytes32 => uint256) public pendingDiplomasIndexes;
    Diploma[] public pendingDiplomas;
    uint256 public pendingDiplomasCount;

    // Let's say we have multiple universities, so it's a good practice to define admins addresses for nwo
    mapping(address => uint256) public adminsIndexes;

    constructor() {
        studentsCount = 0;
        diplomasCount = 0;
        pendingDiplomasCount = 0;
    }

    // ==========modifiers declaration==========
    modifier onlyAdmin() {
        require(adminsIndexes[msg.sender] != 0, "Admin not found");
        _;
    }
    modifier onlyStudent() {
        require(studentsIndexes[msg.sender] != 0, "Student not found");
        _;
    }

    // ==========events definition==========
    event LogRequestDiploma(address studentId);
    event LogAddDiploma(bytes32 diplomaId);

    // ==========Functions definition==========
    // verifyDiploma()
    function verifyDiploma(bytes32 diplomaId) public view returns (Diploma memory){
        require (diplomasIndexes[diplomaId] != 0, "You provided an invalid diploma identifier");
        return diplomas[diplomasIndexes[diplomaId] - 1];
    }

    // addStudent()
    function addStudent(
        address _id,
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        string memory _nationality,
        string memory _phoneNumber,
        string memory _gender,
        Diploma[] memory _diplomas
    ) public onlyAdmin {
        require(studentsIndexes[_id] == 0, "Student already exists");
        studentsCount++;
        studentsIndexes[_id] = students.length + 1;
        students.push(
            Student(_id, _firstName, _lastName, _email, _nationality, _phoneNumber, _gender, _diplomas)
        );
    }
    // addDiploma()
    function addDiploma(bytes32 _id) public onlyAdmin {
        require(diplomasIndexes[_id] == 0, "Diploma already exists");
        require(pendingDiplomasIndexes[_id] != 0, "Diploma request is not registered or has been removed");
        diplomasCount++;
        diplomasIndexes[_id] = diplomas.length + 1;
        diplomas.push(
            pendingDiplomas[pendingDiplomasIndexes[_id] - 1]
        );
        emit LogAddDiploma(_id);
    }
    // isStudent()
    function isStudent() public view returns (bool) {
        return studentsIndexes[msg.sender] != 0;
    }
    // isAdmin()
    function isAdmin() public view returns (bool) {
        return adminsIndexes[msg.sender] != 0;
    }
    // getStudentIndex()
    function getStudentIndex(address studentId) public view returns (uint256) {
        require(studentsIndexes[studentId] != 0, "Student does not exist");
        return studentsIndexes[studentId] - 1;
    }
    // getDiplomaIndex()
    function getDiplomaIndex(bytes32 diplomaId) public view returns (uint256) {
        require(diplomasIndexes[diplomaId] != 0, "Diploma does not exist");
        return diplomasIndexes[diplomaId] - 1;
    }
    // getStudents()
    function getStudents() public onlyAdmin view returns (Student[] memory) {
        return students;
    }
    // getDiplomas()
    function getDiplomas() public onlyAdmin view returns (Diploma[] memory) {
        return diplomas;
    }
    // getStudentDiplomas()
    function getStudentDiplomas(address studentId) public view returns (Diploma[] memory) {
        require(studentsIndexes[studentId] != 0, "Student does not exist");
        require(msg.sender == studentId || adminsIndexes[msg.sender] != 0, "Only owner or admin are allowed");
        return students[studentsIndexes[studentId] - 1].diplomas;
    }
    // requestDiploma()
    function requestDiploma(
        string memory _speciality,
        string memory _honors,
        string memory _title,
        uint256 _dateObtained
    ) public onlyStudent {
        require(studentsIndexes[msg.sender] != 0, "Student does not exist");
        // generate a unique hash identifier for each diploma
        bytes32 id = keccak256(abi.encodePacked(msg.sender, _speciality, _honors, _title, _dateObtained));
        pendingDiplomasCount++;
        pendingDiplomasIndexes[id] = pendingDiplomas.length + 1;
        pendingDiplomas.push(
            Diploma(id, msg.sender, _speciality, _honors, _title, _dateObtained)
        );
        emit LogRequestDiploma(msg.sender);
    }
}