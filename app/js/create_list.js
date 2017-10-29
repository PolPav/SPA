
var $input_valid;       // Array of elements for validation
var $array = [];        // Main array
var $key = '8888';      // Key in LocalStorage
var $now_date;          // Current date

function init(){
    var $month;
    $array ={
        email:[],fname:[],lname:[],tel:[],
        pos:[[]], type:[],provider:[],idn:[],date:[],comment:[],
        number:[],status:[],performed:[]
    };
    $now_date = new Date();
    $month = $now_date.getMonth()+1;
    $now_date = $now_date.getDate()+"-"+0+$month+"-"+$now_date.getFullYear();
    load();
}

// Save the value of the element and add a new one
function add_pos(){
    var $pos = document.getElementById('pos');
        $pos.innerHTML =
        $pos.innerHTML + "\n" +
        "<input type=\"text\" name=\"pos\" placeholder=\"Шариковые ручки\">";
}

// Create a unique order line
function view_id(){
    var $id = document.getElementById('idn');
    var $type = document.getElementById('type');
    var st = $now_date;
        st = st[8]+st[9]+st[3]+st[4]+st[0]+st[1];
        st =  $type.value[0]+"-"+st+get_number();
        $id.value = st;
}

// Field check for emptiness and save orders if its all filled
function check_all(){
    $input_valid = document.getElementsByTagName("input");
    var exit = 0;

    for(var i = 0; i < $input_valid.length; i++){
        if ($input_valid[i].value == "") {
            $input_valid[i].setAttribute("class", "error");
            $input_valid[i].setAttribute("onchange","check("+i+")");
            exit = 1;
        }
    }

    if(exit==0){
        save();
    }

}

// Remove warning in validation fields
function check(x){
    $input_valid[x].removeAttribute("class");
}

// View order numbers and date
function get_head(){
    var head = document.getElementById('head-add');
        head.innerHTML ="Заказ №"+get_number()+" от "+$now_date;
}

// Returns the order number
function get_number(){
    return $array.email.length+1;
}

//Check the date for setting the status
function check_date(num1, num2){
    var n1 = num1;
    var n1_1 = n1.substr(0,2); var n1_2 = n1.substr(3,2); var n1_3 = n1.substr(6,4);
    var n2 = num2;
    var n2_1 = n2.substr(0,2); var n2_2 = n2.substr(3,2); var n2_3 = n2.substr(6,4);

    if (n1_3<n2_3) {
        return "Expired";
    }

    if (n1_2<n2_2 && n1_3<=n2_3){
        return "Expired";
    }

    if (n1_1<n2_1 && n1_2<=n2_2 && n1_3<=n2_3){
        return "Expired";
    }

    return "Confirm"
}

// Set data in table
function set_table(){
    var list = document.getElementById('list');
    for(var i = 0; i<$array.email.length; i++){
        $array.status[i] = check_date($array.performed[i],$now_date);
        list.innerHTML = list.innerHTML + "\n" +
            "<tr>\n"+
            "<td>"+$array.date[i]+"</td>"+
            "<td>"+$array.fname[i]+"</td>"+
            "<td>"+$array.idn[i]+"</td>"+
            "<td>"+$array.type[i]+"</td>"+
            "<td>"+$array.fname[i]+" "+$array.lname[i]+"</td>"+
            "<td>"+$array.provider[i]+"</td>"+
            "<td>"+$array.performed[i]+"</td>"+
            "<td>"+$array.status[i]+"</td>"+
            "</tr>";
    }
}

// Function for retrieving data from local storage
function load(){
    var array = JSON.parse(localStorage.getItem($key));

    if (array==null) return;

    $array = array;
}

// Function for save data in local storage
function save(){
    var num = $array.email.length;
        $array.email[num] = document.getElementById('email').value;
        $array.fname[num] = document.getElementById('fname').value;
        $array.lname[num] = document.getElementById('lname').value;
        $array.tel[num] = document.getElementById('tel').value;
        $array.number[num] = get_number();
        $array.date[num] = $now_date;


    var obj = document.getElementsByName('pos');

    for(var i = 0; i<obj.length; i++) {
        $array.pos[num] = [obj[i].value];
    }

        $array.type[num] = document.getElementById('type').value;
        $array.provider[num] = document.getElementById('provider').value;
        $array.idn[num] = document.getElementById('idn').value;
        $array.performed[num] = document.getElementById('date').value;
        $array.comment[num] = document.getElementById('comment').value;

    var str = JSON.stringify($array);
        localStorage.setItem($key,str);
        alert("Заказ сохранён!");
        location.reload();
}
