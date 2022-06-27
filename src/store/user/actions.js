const actions = {
  async getUserList(page) {
    const request = await fetch(
      `https://randomuser.me/api/?page=${page || 1}&results=10`
    );
    const { results } = await request.json();
    this.users = page > 1 ? [...this.users, ...results] : results;
  },
};

export default { ...actions };
