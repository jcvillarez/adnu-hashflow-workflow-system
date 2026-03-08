class HybridTree {
  first = []; // Root Node

  constructor(jsonArray) {
    if (jsonArray == undefined) {
      this.first = [];
    } else {
      this.first = jsonArrayToNodeArray(jsonArray);
    }
  }

  static fromDOM(dom) {
    let tree = new HybridTree();
    tree.first = this.innerFromDOM(dom);

    return tree;
  }

  /**
   *
   * @param {HTMLUListElement} dom */
  static innerFromDOM(dom) {
    let accumulator = [];

    for (let i = 0; i < dom.children.length; i++) {
      let item = dom.children[i];

      if (
        item.tagName == "LI" &&
        item.getAttribute("data-email") != undefined
      ) {
        const email = item.getAttribute("data-email");
        const role = item.getAttribute("data-role");
        let children = [];

        if (item.nextSibling != undefined) {
          if (
            item.nextSibling.tagName == "UL" &&
            email == item.nextSibling.getAttribute("data-parent")
          ) {
            children = HybridTree.innerFromDOM(item.nextSibling);
          }
        }
        accumulator.push(
          new TreeNode(email, "Pending", role, children, undefined)
        );
      }
    }

    return accumulator;
  }

  getRole(email) {
    for (let i = 0; i < this.first.length; i++) {
      const role = this.first[i].getRole(email);
      if (role) {
        return role;
      }
    }
    return undefined;
  }

  setStatus(email, verdict, role, comment) {
    for (let i = 0; i < this.first.length; i++) {
      if (this.first[i].setStatus(email, verdict, role, comment)) {
        break;
      }
    }
  }

  getStatus(email) {
    let reviseCount = 0;

    for (let i = 0; i < this.first.length; i++) {
      const status = this.first[i].getStatus(email);

      if (status == "Reject") {
        return "Reject";
      } else if (status == "Revise") {
        reviseCount += 1;
        continue;
      } else if (status == "Pending") {
        return "Pending";
      } else if (status == "Hidden") {
        continue;
      } else if (status == "Approved") {
        return "Approved";
      } else {
        return "Hidden";
      }
    }

    if (reviseCount == this.first.length) {
      return "Revise";
    }

    return "Hidden";
  }

  getStatus2() {
    for (let i = 0; i < this.first.length; i++) {
      const status = this.first[i].getStatus2();

      if (status == "Reject") {
        return "Reject";
      } else if (status == "Revise") {
        return "Revise";
      } else if (status == "Pending") {
        return "Pending";
      } else {
        continue;
      }
    }

    return "Approved";
  }

  toJson() {
    return this.first.map((item) => {
      return item.toJson();
    });
  }

  getProgress() {
    let count = 0;

    function countApproved(node) {
      if (
        (node.status === "Approved" && node.role !== "Viewer") ||
        (node.status === "Revise" && node.role !== "Viewer")
      ) {
        count++;
      }

      for (let i = 0; i < node.children.length; i++) {
        countApproved(node.children[i]);
      }
    }

    for (let i = 0; i < this.first.length; i++) {
      countApproved(this.first[i]);
    }

    return count;
  }

  getTotal(roleArray) {
    let total = 0;

    for (let i = 0; i < roleArray.length; i++) {
      let role = roleArray[i];
      for (let j = 0; j < this.first.length; j++) {
        total += this.first[j].getTotal(role);
      }
    }

    return total;
  }

  getComments() {
    return this.first.reduce((a, item) => {
      return a.concat(item.getComments());
    }, []);
  }

  getEmailProgress() {
    return this.first.reduce((a, item) => {
      return a.concat(item.getEmailProgress());
    }, []);
  }

  getEmails() {
    return this.first.reduce((a, item, index) => {
      const emails = item.getEmails().join(", ");
      const isLastItem = index === this.first.length - 1;
      const separator = isLastItem ? "" : ", ";
      return a.concat(emails, separator);
    }, "");
  }
  findNode(email) {
    for (let i = 0; i < this.first.length; i++) {
      const node = this.first[i].findNode(email);
      if (node) {
        return node;
      }
    }
    return undefined;
  }
}

class TreeNode {
  email;
  status;
  role;
  comment;
  children = [];

  constructor(email, status, role, children, comment) {
    this.email = email;
    this.status = status;
    this.role = role;
    this.children = children;
    this.comment = comment;
  }

  toJson() {
    let children = this.children.map((item) => {
      return item.toJson();
    });

    return this.comment == undefined
      ? {
          email: this.email,
          status: this.status,
          role: this.role,
          children: children,
        }
      : {
          email: this.email,
          status: this.status,
          comment: this.comment,
          role: this.role,
          children: children,
        };
  }

  findNode(email) {
    if (this.email === email) {
      return this;
    }

    for (let i = 0; i < this.children.length; i++) {
      const node = this.children[i].findNode(email);
      if (node) {
        return node;
      }
    }

    return undefined;
  }

  getComments() {
    return this.children.reduce(
      (a, item) => {
        return a.concat(item.getComments());
      },
      this.comment == undefined
        ? []
        : [
            {
              comment: this.comment,
              email: this.email,
            },
          ]
    );
  }

  getEmailProgress() {
    return this.children.reduce(
      (a, item) => {
        return a.concat(item.getEmailProgress());
      },
      this.email == undefined
        ? []
        : [
            {
              email: this.email,
              status: this.status,
              role: this.role,
            },
          ]
    );
  }

  getEmails() {
    return this.children.reduce(
      (a, item) => {
        return a.concat(item.getEmails());
      },
      [this.email]
    );
  }

  getProgress() {
    let count = 0;
    if (
      (this.status == "Approved" && this.role == "Approver") ||
      (this.status == "Revise" && this.role == "Approver")
    ) {
      count += 1;
    }

    if (this.children == undefined || this.children.length == 0) {
      return count;
    } else {
      return this.children.reduce((a, item) => {
        return item.getProgress() + a;
      }, count);
    }
  }

  getTotal(role) {
    let total = 0;
    if (this.role === role) {
      total++;
    }
    for (let i = 0; i < this.children.length; i++) {
      total += this.children[i].getTotal(role);
    }
    return total;
  }

  setStatus(email, verdict, comment) {
    if (this.email == email) {
      this.status = verdict;
      this.comment = comment;
      return true;
    } else {
      for (let i = 0; i < this.children.length; i++) {
        if (this.children[i].setStatus(email, verdict, comment)) {
          return true;
        }
      }

      return false;
    }
  }
  getRole(email) {
    if (this.email === email) {
      return this.role;
    }
    for (let i = 0; i < this.children.length; i++) {
      const role = this.children[i].getRole(email);
      if (role) {
        return role;
      }
    }
    return undefined;
  }

  getStatus2() {
    switch (this.status) {
      case "Reject":
        return "Reject";
      case "Revise":
        return "Revise";
      case "Pending":
        return "Pending";
      default:
        return this.nextStatus2();
    }
  }

  getStatus(email) {
    if (email == this.email) {
      switch (this.status) {
        case "Reject":
          return "Reject";
        case "Revise":
          return "Revise";
        case "Pending":
          return "Pending";
        case "Approved":
          return this.nextStatus(email);
        default:
          return "Hidden";
      }
    } else {
      switch (this.status) {
        case "Reject":
          return "Reject";
        case "Revise":
          return "Revise";
        case "Pending":
          return "Hidden";
        case "Approved":
          if (this.children.length == 0) {
            return "Hidden";
          }

          return this.nextStatus(email);
        default:
          return "Hidden";
      }
    }
  }

  nextStatus(email) {
    if (this.children == undefined || this.children.length == 0) {
      return this.status;
    }

    for (let i = 0; i < this.children.length; i++) {
      let next_status = this.children[i].getStatus(email);

      switch (next_status) {
        case "Reject":
          return "Reject";
        case "Revise":
          return "Revise";
        case "Pending":
          return "Pending";
        case "Hidden":
          continue;
        case "Approved":
          if (this.children == undefined || this.children.length == 0) {
            return this.nextStatus(email);
          }
          break;
        default:
          return "Hidden";
      }
    }
    return "Hidden";
  }

  nextStatus2() {
    if (this.children == undefined || this.children.length == 0) {
      return this.status;
    }

    for (let i = 0; i < this.children.length; i++) {
      let nextStatus = this.children[i].getStatus2();

      switch (nextStatus) {
        case "Reject":
          return "Reject";
        case "Revise":
          return "Revise";
        case "Pending":
          return "Pending";
        case "Approved":
          continue;
      }
    }

    return "Approved";
  }
}

function jsonToNode(json) {
  let email = json.email;
  let status = json.status;
  let role = json.role;
  let comment = json.comment;
  let children = jsonArrayToNodeArray(json.children);

  return new TreeNode(email, status, role, children, comment);
}

function jsonArrayToNodeArray(jsonArray) {
  if (jsonArray === undefined || jsonArray === null) {
    return [];
  }

  return jsonArray.map((json) => {
    return jsonToNode(json);
  });
}

export { HybridTree, TreeNode };
