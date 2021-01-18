// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;
    struct Diploma {
        bytes32 id;
        bytes32 blueprintId;
        address owner;
        address issuer;
        string honors;
        uint256 dateObtained; // timestamps format
    }

    struct Student {
        address id;
        string firstName;
        string lastName;
        string email;
        bytes32[] diplomas;
    }

    struct DiplomaBluePrint{
        bytes32 id;
        address issuer;
        string title;
        string description;
        string speciality;
        bytes32[] diplomas;
    }
contract Diplomachain {
    
    // students storage
    mapping(address => uint256) private studentsIndexes;
    Student[] public students;
    uint256 public studentsCount;

    // diploma storage
    mapping(bytes32 => uint256) public diplomasIndexes;
    Diploma[] public diplomas;
    uint256 public diplomasCount;

    // pending diplomas storage
    mapping(bytes32 => uint256) public pendingDiplomasIndexes;
    Diploma[] public pendingDiplomas;
    uint256 public pendingDiplomasCount;

    // diploma blueprints storage
    mapping(bytes32 => uint256) private diplomaBlueprintsIndexes;
    DiplomaBluePrint[] private diplomaBlueprints;
    uint256 public diplomaBlueprintsCount;

    /* // Let's say we have multiple universities, so it's a good practice to define admins addresses for now
    mapping(address => uint256) public adminsIndexes;

    // Since every diploma will be issued by a university club, we need to have issuersIndexes
    mapping(address => uint256) public issuersIndexes; */

    address private admin;

    constructor() {
        admin = msg.sender; // specifiy the admin when deploying the contract;
        studentsCount = 0;
        diplomasCount = 0;
        pendingDiplomasCount = 0;
        diplomaBlueprintsCount = 0;
    }

    // ==========modifiers declaration==========
    modifier onlyAdmin() {
        require(msg.sender == admin, "Admin not found");
        _;
    }
    modifier onlyStudent() {
        require(studentsIndexes[msg.sender] != 0, "Student not found");
        _;
    }
    /* modifier onlyIssuer() {
        require(issuersIndexes[msg.sender] != 0, "Issuer not found");
        _;
    } */

    // ==========events definition==========
    event LogRequestDiploma(address studentId);
    event LogAddDiploma(bytes32 diplomaId);
    event LogAddStudent(address studentId);
    event LogAddDiplomaBlueprint(bytes32 diplomaBlueprintId);
    event LogDeleteDiploma(bytes32 diplomaId);
    event LogDeleteStudent(address studentId);
    // ==========Functions definition==========
    // verifyDiploma()
   /*  function verifyDiploma(bytes32 diplomaId) public view returns (Diploma memory){
        require (diplomasIndexes[diplomaId] != 0, "You provided an invalid diploma identifier");
        return diplomas[diplomasIndexes[diplomaId] - 1];
    } */
    // getDiploma() : for now, verifyDiploma() has the same code as getDiploma(), probably we'll remove the other fct
    function getDiploma(bytes32 diplomaId) public view returns (Diploma memory){
        require (diplomasIndexes[diplomaId] != 0, "You provided an invalid diploma identifier");
        return diplomas[diplomasIndexes[diplomaId] - 1];
    }
    // addStudent()
    function addStudent(
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        bytes32[] memory _diplomas
    ) public {
        require(studentsIndexes[msg.sender] == 0, "Student already exists");
        require( msg.sender != admin, "Admin is not a student");
        // require(adminsIndexes[msg.sender] == 0, "An admin cannot enroll as a student");
        // require(issuersIndexes[msg.sender] == 0, "An issuer cannot enroll as a student");
        studentsCount++;
        studentsIndexes[msg.sender] = students.length + 1;
        students.push(
            Student(msg.sender, _firstName, _lastName, _email, _diplomas)
        );
        emit LogAddStudent(msg.sender);
    }
    // getStudent()
    function getStudent(address student_addr) public view returns (Student memory){
        require (studentsIndexes[student_addr] != 0, "You provided an invalid student address");
        return students[studentsIndexes[student_addr] - 1];
    }
    // deleteStudent()
    /* function deleteStudent(address student_addr) public onlyAdmin {
        // 1 - delete the student's diplomas
        bytes32[] memory diplomas_ids = students[studentsIndexes[student_addr] - 1].diplomas;
        for (uint i = 0; i < diplomas_ids.length; i++) {
            removeDiplomaItem(diplomas, diplomasIndexes[diplomas_ids[i]] - 1);
            delete diplomasIndexes[diplomas_ids[i]];
            diplomasCount--;
            emit LogDeleteDiploma(diplomas_ids[i]);
        }
        // 2 - delete the student
        removeStudentItem(students, studentsIndexes[student_addr] - 1);
        delete studentsIndexes[student_addr];
        studentsCount--;
        emit LogDeleteStudent(student_addr);
    } */
    // remove an element from diplomas array and shift to avoid leaving gaps
    function removeDiplomaItem(Diploma[] storage array, uint256 index) private {
        for (uint i = index; i < array.length - 1; i++) {
            array[i] = array[i + 1];
        }
        delete array[array.length - 1];
        array.pop();
    }
    // remove an element from students array and shift to avoid leaving gaps
    /* function removeStudentItem(Student[] storage array, uint256 index) private {
        for (uint i = index; i < array.length - 1; i++) {
            array[i] = array[i + 1];
        }
        delete array[array.length - 1];
        array.pop();
    } */
    // addDiploma() => when a student requests a diploma, the admin will call this fct to issue it
    function addDiploma(bytes32 _id) public onlyAdmin {
        require(diplomasIndexes[_id] == 0, "Diploma already exists");
        require(pendingDiplomasIndexes[_id] != 0, "Diploma request is not registered or has been removed");
        diplomasCount++;
        diplomasIndexes[_id] = diplomas.length + 1;
        diplomas.push(
            pendingDiplomas[pendingDiplomasIndexes[_id] - 1]
        );
        // get the student (owner) address
        address student_adr = pendingDiplomas[pendingDiplomasIndexes[_id] - 1].owner;
        // add the new diploma id to the student's diplomas ids array
        students[studentsIndexes[student_adr] - 1].diplomas.push(
            _id
        );
        // remove the diploma from the pending diplomas array
        removeDiplomaItem(pendingDiplomas, pendingDiplomasIndexes[_id] - 1);
        delete pendingDiplomasIndexes[_id];
        pendingDiplomasCount--;
        emit LogAddDiploma(_id);
    }
    // issueDiploma() => when the issuer himself wants to issue a diploma, he'll be able to do that directly
    function issueDiploma(
        address owner,
        bytes32 blueprintId,
        string memory _honors,
        uint256 _dateObtained
    ) public onlyAdmin {
        require(studentsIndexes[owner] != 0 ,"Student not found");
        // require(msg.sender == admin, "You cannot add a diploma issued by someone else..");
        // generate a unique hash identifier for each diploma
        bytes32 id = keccak256(abi.encodePacked(owner, admin, blueprintId, _honors, _dateObtained));
        diplomasCount++;
        diplomasIndexes[id] = diplomas.length + 1;
        diplomas.push(
            Diploma(id,  blueprintId, owner, admin, _honors, _dateObtained)
        );
        // add the new diploma id to the student's diplomas ids array
        students[studentsIndexes[owner] - 1].diplomas.push(
            id
        );
        emit LogAddDiploma(id);
    }
    // isStudent()
    function isStudent() public view returns (bool) {
        return studentsIndexes[msg.sender] != 0;
    }
    // isAdmin()
    function isAdmin() public view returns (bool) {
        
        return msg.sender == admin;
        //return adminsIndexes[msg.sender] != 0;
    }
    // isIssuer()
   /*  function isIssuer() public view returns (bool) {
        return issuersIndexes[msg.sender] != 0;
    } */
    // getStudentIndex()
    /* function getStudentIndex(address studentId) public view returns (uint256) {
        require(studentsIndexes[studentId] != 0, "Student does not exist");
        return studentsIndexes[studentId] - 1;
    }
    // getDiplomaIndex()
    function getDiplomaIndex(bytes32 diplomaId) public view returns (uint256) {
        require(diplomasIndexes[diplomaId] != 0, "Diploma does not exist");
        return diplomasIndexes[diplomaId] - 1;
    } */

    /*
    
        getX(id) is not used in the front, also it can be replace by using the default getter 

        diplomaIndexes is public so we can use diplomaIndexes(id) to get the index
        also we can use the default getter for the array types 
        we can use diplomas(index -1) directly outstide the contract instead of implementing it
    */ 


    // getStudents()
    function getStudents() public onlyAdmin view returns (Student[] memory) {
        return students;
    }
    // getDiplomas()
    function getDiplomas() public onlyAdmin view returns (Diploma[] memory) {
        return diplomas;
    }
    // getStudentDiplomasIds()
    /* function getStudentDiplomasIds(address studentId) public view returns (bytes32[] memory) {
        require(studentsIndexes[studentId] != 0, "Student does not exist");
        require(msg.sender == studentId || adminsIndexes[msg.sender] != 0, "Only owner or admin are allowed");
        return students[studentsIndexes[studentId] - 1].diplomas;
    } */
    // getStudentDiplomas()
    function getStudentDiplomas(address studentId) public view returns (Diploma[] memory) {
        require(msg.sender == studentId || msg.sender == admin, "Only owner or admin are allowed");
        require(studentsIndexes[studentId] != 0, "Student does not exist");
        bytes32[] memory diplomas_ids = students[studentsIndexes[studentId] - 1].diplomas;
        Diploma[] memory full_diplomas = new Diploma[](diplomas_ids.length);
        for (uint256 i = 0; i < diplomas_ids.length; i++) {
            full_diplomas[i] = diplomas[diplomasIndexes[diplomas_ids[i]] - 1];
        }
        return full_diplomas;
    }
    // requestDiploma()
    function requestDiploma(
        bytes32 blueprintId,
        string memory _honors,
        uint256 _dateObtained
    ) public onlyStudent {
        require(studentsIndexes[msg.sender] != 0, "Student does not exist");

        // We have only one issuer (the admin)
        // require(issuersIndexes[issuer] != 0, "Issuer does not exist");
        // generate a unique hash identifier for each diploma
        bytes32 id = keccak256(abi.encodePacked(msg.sender, admin , blueprintId,  _honors, _dateObtained));
        pendingDiplomasCount++;
        pendingDiplomasIndexes[id] = pendingDiplomas.length + 1;
        pendingDiplomas.push(
            Diploma(id, blueprintId ,msg.sender, admin, _honors, _dateObtained)
        );
        emit LogRequestDiploma(msg.sender);
    }


    function addDiplomaBlueprint(
        string memory title,
        string memory description,
        string memory speciality,
        bytes32[] memory _diplomas
    ) public onlyAdmin {
        bytes32 id = keccak256(abi.encodePacked(msg.sender, title, description,speciality));
        require(diplomaBlueprintsIndexes[id] ==0,"Blue print already exist");
        diplomaBlueprintsCount++;
        diplomaBlueprintsIndexes[id] = diplomaBlueprints.length + 1;
        diplomaBlueprints.push(
            DiplomaBluePrint(id,msg.sender, title, description,speciality,_diplomas)
        );
        emit LogAddDiplomaBlueprint(id);
    }
    function getDiplomaBlueprint(bytes32 id) public onlyAdmin view returns (DiplomaBluePrint memory) {
        require(diplomaBlueprintsIndexes[id]!=0, "Diploma Bluerprint not found");
        return diplomaBlueprints[diplomaBlueprintsIndexes[id] - 1];
    }
    // this will return all diplom blueprints because we have a single issuer (else we will select based on the issuer)
    function getDiplomaBlueprints()public onlyAdmin view returns (DiplomaBluePrint[] memory){
        return diplomaBlueprints;
    }
    // returns the diploma by the selected blueprint
    function getDiplomasByBlueprint(bytes32 id) public onlyAdmin view returns (Diploma[] memory){
        require(diplomaBlueprintsIndexes[id]!=0, "Diploma Bluerprint not found");
        bytes32[] memory diplomas_ids = diplomaBlueprints[diplomaBlueprintsIndexes[id] - 1].diplomas;
        Diploma[] memory _diplomas = new Diploma[](diplomas_ids.length);
        for (uint256 i = 0; i < diplomas_ids.length; i++) {
            _diplomas[i] = diplomas[diplomasIndexes[diplomas_ids[i]] - 1];
        }
        return _diplomas;
    }

}