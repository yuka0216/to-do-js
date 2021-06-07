import "./styles.css";

const onClickAdd = () => {
  //テキストボックスの値を取得し、初期化する
  const text = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";
  createIncompleteList(text);
};

//未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

//未完了リストに追加する関数
const createIncompleteList = (text) => {
  //li生成
  const li = document.createElement("li");

  //div生成
  const div = document.createElement("div");
  div.className = "list-row";

  //p生成
  const p = document.createElement("p");
  p.innerText = text;

  //button(完了)タグ生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    //ボタンの親要素を取得して削除
    const completeTarget = completeButton.parentNode;
    deleteFromIncompleteList(completeTarget.parentNode);

    //完了リストに追加する要素
    //<div>以下
    const addTarget = completeButton.parentNode;
    //<li>以下
    const addElement = addTarget.parentNode;

    //todo内容テキストを取得
    const text = addTarget.firstElementChild.innerText;

    //div以下を初期化
    addTarget.textContent = null;

    const li = document.createElement("li");

    //pタグ生成
    const p = document.createElement("p");
    p.innerText = text;

    //buttonを生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      //押された戻すボタンの親タグを完了リストから削除
      const deleteTarget = backButton.parentNode;
      const deleteElement = deleteTarget.parentNode;
      document.getElementById("complete-list").removeChild(deleteElement);

      //テキストを取得
      const text = backButton.parentNode.firstElementChild.innerText;
      createIncompleteList(text);
    });

    //divタグの子要素に各要素を設定

    addTarget.appendChild(p);
    addTarget.appendChild(backButton);
    li.appendChild(addTarget);

    //完了リストに追加
    document.getElementById("complete-list").appendChild(li);
  });

  //button(削除)タグ生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    //押された削除ボタンの親タグ(li)を未完了リストから削除
    const deleteTarget = deleteButton.parentNode;
    deleteFromIncompleteList(deleteTarget.parentNode);
  });

  //liタグの子要素にdiv,divタグの子要素にp要素を設定
  li.appendChild(div);
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  //未完了のリストに追加 ulのクラス名incomplete-listの子要素にliを設定
  document.getElementById("incomplete-list").appendChild(li);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
